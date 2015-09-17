function ChromaMixer () {
    this.channels = Array();
    this.addChannel = function (channel) {
        this.channels.push(channel);
    }
    this.linkChannelToOutput = function (output,channelIndex) {
        output.setChannel(this.channels[channelIndex]);
    }
    this.setVolume = function (volume,channelIndex) {
        this.channels[channelIndex].setVolume(volume);
    }
}

function ChromaOutput () {
    this.channel = undefined;
    this.color = new ChromaColor(0,0,0,0);
    this.update = function () {
        this.channel.update();
        this.color = this.channel.render();
    }
    this.getColor = function () {
        return this.color;
    }
    this.setChannel = function (channel) {
        this.channel = channel;
    }
}

function ChromaChannel () {
    this.layer = undefined;
    this.value = new ChromaColor(0,0,0,0);
    this.volume = 1;
    this.update = function () {
        this.layer.update();
        this.value = this.layer.getValue().crop();
    }
    this.render = function () {
        return this.value.multiply(new ChromaColor(this.volume,this.volume,this.volume,1));
    }
    this.setVolume = function (vol) {
        if(vol <= 1 && vol >= 0) {
            this.volume = vol;
        }
    }
    this.setLayer = function (layer) {
        this.layer = layer;
    }
}

function ChromaLayer () {
    this.generators = Array();
    this.color = new ChromaColor(0,0,0,0);
    this.addGenerator = function (generator) {
        this.generators.push(generator);
    }
    this.update = function () {
        this.color = new ChromaColor(0,0,0,0);
        for(var i = 0; i < this.generators.length; i++) {
            this.generators[i].update();
            this.color.add(this.generators[i].render());
        }
    }
    this.getValue = function () {
        return this.color;
    }
}

function RandomDrawer () {
    this.time = 0;
    this.update = function () {
        this.time++;
    }
    this.render = function () {
        return new ChromaColor(Math.abs(Math.sin(this.time/100)*0.8),Math.abs(Math.sin(this.time/100+Math.PI)*0.8),Math.abs(Math.sin(this.time/100+Math.PI*1.5)*0.8),1)
    }
}
function ColorDrawer () {
    this.time = 0;
    this.update = function () {
        this.time++;
    }
    this.render = function () {
        return new ChromaColor(Math.random(),Math.random(),Math.random(),0.1)
    }
}

function ChromaColor (r,g,b,a) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
    this.getValue = function () {
        return [this.r,this.g,this.b,this.a];
    }
    this.multiply = function (x) {
        this.r = this.r * x.r;
        this.g = this.g * x.g;
        this.b = this.b * x.b;
        this.a = this.a * x.a;
        return this;
    }
    this.add = function (x) {
        this.r = this.r + x.r*x.a;
        this.g = this.g + x.g*x.a;
        this.b = this.b + x.b*x.a;
        this.a = this.a + x.a;
        return this;
    }
    this.subtract = function (x) {
        this.r = this.r - x.r*x.a;
        this.g = this.g - x.g*x.a;
        this.b = this.b - x.b*x.a;
        this.a = this.a - x.a;
        return this;
    }
    this.divide = function (x) {
        this.r = this.r / x.r*x.a;
        this.g = this.g / x.g*x.a;
        this.b = this.b / x.b*x.a;
        this.a = this.a / x.a;
        return this;
    }
    this.crop = function () {
        this.r = (this.r>1)?1:this.r;
        this.r = (this.r<0)?0:this.r;
        this.g = (this.g>1)?1:this.g;
        this.g = (this.g<0)?0:this.g;
        this.b = (this.b>1)?1:this.b;
        this.b = (this.b<0)?0:this.b;
        this.a = (this.a>1)?1:this.a;
        this.a = (this.a<0)?0:this.a;
        return this;
    }
}
