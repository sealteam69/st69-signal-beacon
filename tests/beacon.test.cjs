const {test} = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
function harness() {
  const timers = new Map(); let next = 0;
  class Element {
    constructor(text='') { this.textContent=text; this.events={}; this.attributes={}; this.style={setProperty(){}}; this.classes=new Set(); this.classList={add:c=>this.classes.add(c),remove:c=>this.classes.delete(c),toggle:c=>{if(this.classes.has(c)){this.classes.delete(c);return false;}this.classes.add(c);return true;}}; }
    addEventListener(name,fn){(this.events[name]??=[]).push(fn);}
    setAttribute(name,value){this.attributes[name]=value;}
    append(){} replaceChildren(){}
  }
  const glyphs=[new Element('S'),new Element('6')];
  const patch=new Element(), status=new Element(), audio=new Element();
  audio.paused=true; audio.play=()=>{audio.paused=false;return Promise.resolve();}; audio.pause=()=>{audio.paused=true;};
  const media={matches:false,addEventListener(){}};
  const doc={hidden:false,querySelectorAll:s=>s==='.secret-number'?[]:glyphs,querySelector:s=>({'#eddie-audio':audio,'#patch-audio':patch,'#audio-status':status}[s]),createElement:()=>new Element(),addEventListener(){}};
  const node=()=>({connect(){return this;},gain:{value:0,cancelScheduledValues(){},setTargetAtTime(){},setValueAtTime(){},linearRampToValueAtTime(){}},frequency:{value:0},delayTime:{value:0}});
  class AudioContext {constructor(){this.currentTime=0;}createMediaElementSource(){return node();}createBiquadFilter(){return node();}createGain(){return node();}createDelay(){return node();}resume(){return Promise.resolve();}suspend(){return Promise.resolve();}}
  const context=vm.createContext({document:doc,window:{matchMedia:()=>media,AudioContext,addEventListener(){}},setTimeout:(fn,ms)=>{const id=++next;timers.set(id,{fn,ms});return id;},clearTimeout:id=>timers.delete(id),console});
  vm.runInContext(fs.readFileSync('beacon.js','utf8'),context);
  return {context,timers,glyphs,doc,media,audio,patch};
}
test('motion timers pause and resume without accumulating animation listeners',()=>{
 const h=harness(); assert.equal(h.timers.size,2);
 for(let i=0;i<30;i++){for(const [id,t] of [...h.timers]){h.timers.delete(id);assert.ok(t.ms>=2000&&t.ms<4000);t.fn();}h.doc.hidden=true;vm.runInContext('updateTitleMotion()',h.context);assert.equal(h.timers.size,0);h.doc.hidden=false;vm.runInContext('updateTitleMotion()',h.context);}
 for(const g of h.glyphs){assert.equal(g.events.animationend.length,1);assert.equal(g.events.animationcancel.length,1);}
 h.media.matches=true;vm.runInContext('updateTitleMotion()',h.context);assert.equal(h.timers.size,0);
});
test('a late play promise cannot stop a newer audio session',async()=>{
 const h=harness();let release;h.audio.play=()=>{h.audio.paused=false;return new Promise(r=>release=r);};
 const first=vm.runInContext('playEcho()',h.context);
 vm.runInContext('stopEcho()',h.context);assert.equal(h.audio.paused,true);
 h.audio.play=()=>{h.audio.paused=false;return Promise.resolve();};
 await vm.runInContext('playEcho()',h.context);release();await first;
 assert.equal(h.audio.paused,false);assert.equal(h.patch.attributes['aria-pressed'],'true');
 vm.runInContext('stopEcho()',h.context);assert.equal(h.audio.paused,true);assert.equal(h.patch.attributes['aria-pressed'],'false');
});
