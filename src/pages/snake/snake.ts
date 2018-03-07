import { Component, ViewChild, Renderer } from '@angular/core';
import { NativeAudio } from '@ionic-native/native-audio';
import { IonicPage, NavController, NavParams, Platform, AlertController } from 'ionic-angular';

import { ScreenOrientation } from "@ionic-native/screen-orientation";
import { HomePage } from '../home/home';

/**
 * Generated class for the SnakePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
// @IonicPage()
@Component({
  selector: 'page-snake',
  templateUrl: 'snake.html',
})
export class SnakePage {
  
  @ViewChild('gameField') canvas: any;
  canvasElement: any;
  public unregisterBackButtonAction: any;
 
  constructor(public navCtrl: NavController, public navParams: NavParams, public renderer: Renderer, 
    public platform: Platform, public alertCtrl: AlertController, public nativeAudio: NativeAudio,
    public screenOrientation: ScreenOrientation) {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
    console.log('Orientation locked landscape.');

    platform.registerBackButtonAction(() => {
        this.backButtonAction();
        console.log('bck');
    });
  }

  backButtonAction(){
    this.screenOrientation.unlock();
    this.navCtrl.setRoot(HomePage);
    }
  initializeBackButtonCustomHandler(): void {
        this.unregisterBackButtonAction = this.platform.registerBackButtonAction(function(event){
            console.log('Prevent Back Button Page Change');
        }, 101); // Priority 101 will override back button handling (we set in app.component.ts) as it is bigger then priority 100 configured in app.component.ts file */
    }       

  ionViewDidLoad() {
    console.log('ionViewDidLoad SnakePage');
    this.initializeBackButtonCustomHandler();
  }

  ngAfterViewInit() {
    this.nativeAudio.preloadSimple('eat', '../src/eat.mp3');
    this.canvasElement = this.canvas.nativeElement;
    const context = this.canvasElement.getContext("2d");
    let width = Math.min(this.platform.width() - 100, 600);
    let height = Math.min(this.platform.height() - 100, 600);

    width = Math.min(width, height);
    height = width;

    let CELLS_COUNT = 15;
    if (width < 500) {
      CELLS_COUNT = 10;
    }
    const CELL_SIZE = Math.floor(width / CELLS_COUNT);

    width = CELLS_COUNT * CELL_SIZE;
    height = CELLS_COUNT * CELL_SIZE;

    this.renderer.setElementAttribute(this.canvasElement, 'width', width + "");
    this.renderer.setElementAttribute(this.canvasElement, 'height', width + "");

    console.log("width: " + width + ", cell size: " + CELL_SIZE + ", cell count: " + CELLS_COUNT);
    let snake = [];
    let food = null;
    let dir = null;
    let lastDir = "none";
    let score = 0;
    let speedCoeff = 1;
    let newPos = {
      x: null,
      y: null
    }
    let alert = this.alertCtrl.create({
      title: 'Game over!',
      subTitle: 'Your score: ',
      buttons: [{
        text: 'Play again',
        handler: () => {
          this.navCtrl.pop(); 
          this.navCtrl.push(SnakePage)
        }
      }]
    });

    let play = this.nativeAudio.play;
    const FIELD_COLOR = "#f0f0f0";
    const FOOD_COLOR = 'rgba(0, 255, 255, 0.2)';
    const GRID_COLOR = "#d9d9d9";
    const SNAKE_COLOR = 'rgba(255,0, 0, 0.2)';
    addEventListener("keydown", function(e) {
      if (e.keyCode === 37 && dir !== "right") {
        dir = "left";
      } else if (e.keyCode === 38 && dir !== "down") {
        dir = "up";
      } else if (e.keyCode === 39 && dir !== "left") {
        dir = "right";
      } else if (e.keyCode === 40 && dir !== "up") {
        dir = "down";
      }
    });

    // joydiv
    var element = document.getElementById('controller');
    var element2 = document.getElementById('controller2');
    var joydiv = new JoydivModule.Joydiv({'element':element});
    var joydiv2 = new JoydivModule.Joydiv({'element':element2});
    element.addEventListener('joydiv-changed',function(e){
      var dirt = joydiv.getOneOf4Directions().name;
      // if (dirt !== 'none') {
        // console.log(dirt, dir);
        // console.log(dirt == "left" && dir != 'right');
        // console.log(dir == 'left');
        // console.log(dir == 'up');
        // console.log(dir == 'down');
        if (dirt == "left" && dir != 'right') {
        dir = "left";
        } else if (dirt == "up" && dir != "down") {
          dir = "up";
        } else if (dirt == "right" && dir != "left") {
          dir = "right";
        } else if (dirt == "down" && dir != "up") {
          dir = "down";
        } else {
          dir = "none";
        }
      // }
    });
    element2.addEventListener('joydiv-changed',function(e){
      var dirt2 = joydiv2.getOneOf4Directions().name;
      // console.log(dir, dirt2);
      // if (dirt2 !== 'none') {
        if (dirt2 == "left" && dir != 'right') {
        dir = "left";
        } else if (dirt2 == "up" && dir != "down") {
          dir = "up";
        } else if (dirt2 == "right" && dir != "left") {
          dir = "right";
        } else if (dirt2 == "down" && dir != "up") {
          dir = "down";
        } else {
          dir = "none";
        }
      // }
    });
    const draw = function() {
      draw_field();
      draw_snake();
      draw_food();
    };
    const draw_field = function() {
      context.fillStyle = FIELD_COLOR;
      context.fillRect(0, 0, width, height);
    //   context.strokeStyle = GRID_COLOR;
    //   for (let i = CELL_SIZE; i < height; i += CELL_SIZE) {
    //     context.moveTo(0, i);
    //     context.lineTo(width, i);
    //     context.stroke();
    //   }
    //   for (let i = CELL_SIZE; i < width; i += CELL_SIZE) {
    //     context.moveTo(i, 0);
    //     context.lineTo(i, height);
    //     context.stroke();
    //   }
    };
    const draw_food = function() {
      context.beginPath();
      context.strokeStyle = "rgba(0,0,0,0)";
      context.fillStyle = FOOD_COLOR;
      context.fillRect(food.x, food.y, CELL_SIZE, CELL_SIZE);
      context.closePath();
    };
    const draw_snake = function() { 
      context.fillStyle = SNAKE_COLOR;
      context.strokeStyle = "rgba(0,0,0,0)";
      context.beginPath();
      if (dir == "right") {
        context.moveTo(snake[0].x, snake[0].y);
        context.lineTo(snake[0].x + CELL_SIZE * Math.sqrt(3) / 2, snake[0].y + CELL_SIZE / 2);
        context.lineTo(snake[0].x, snake[0].y + CELL_SIZE);
        context.fill();
      } else if (dir == "left") {
        context.moveTo(snake[1].x, snake[0].y);
        context.lineTo(snake[1].x - CELL_SIZE * Math.sqrt(3) / 2, snake[0].y + CELL_SIZE / 2);
        context.lineTo(snake[1].x, snake[0].y + CELL_SIZE);
        context.fill();
      } else if (dir == "down") {
        context.moveTo(snake[0].x, snake[0].y);
        context.lineTo(snake[1].x + CELL_SIZE / 2, snake[0].y + CELL_SIZE * Math.sqrt(3) / 2);
        context.lineTo(snake[1].x + CELL_SIZE, snake[0].y);
        context.fill();
      } else if (dir == "up") {
        context.moveTo(snake[0].x, snake[1].y);
        context.lineTo(snake[1].x + CELL_SIZE / 2, snake[1].y - CELL_SIZE * Math.sqrt(3) / 2);
        context.lineTo(snake[1].x + CELL_SIZE, snake[1].y);
        context.fill();
      }
      
      for (let i = 1; i < snake.length; i++) {
        context.fillRect(snake[i].x, snake[i].y, CELL_SIZE, CELL_SIZE);
        context.strokeRect(snake[i].x, snake[i].y, CELL_SIZE,
          CELL_SIZE);
      }
    };
    const init = function() {
      snake = [];
      for (let i = 0; i < 2; ++i) {
        snake.push({
          x: i * CELL_SIZE,
          y: 0
        });
        snake.reverse();
      }
      dir = "none";
      score = 0;
      speedCoeff = 0.7;
      spawn_food();
    };
    const isContact = function(fieldObj) {
      if (dir == "none") return false;
      let contact = false;
      for (let i = 0; i < snake.length && !contact; i++) {
        contact = snake[i].x === fieldObj.x && snake[i].y === fieldObj.y;
      }
      return contact;
    };
    const isValid = function(pos) {
        return 0 <= pos.x && pos.x < width && 0 <= pos.y && pos.y < height;
    }
    const spawn_food = function() {
      do {
        food = {
          x: Math.floor(
            Math.round(Math.random() * width) / CELL_SIZE) * CELL_SIZE,
          y: Math.floor(
            Math.round(Math.random() * height) / CELL_SIZE) * CELL_SIZE
        }
      } while (isContact(food) || !isValid(food))
    };
    const step = function(firstTime) {
      if (dir == "none" && !firstTime) {
        setTimeout(step, 200 / speedCoeff);
        return;
      }
      if ((dir === "up" && lastDir == "down") || (dir == "right" && lastDir == "left") || (dir == "down" && lastDir == "up") 
      || (dir === "left" && lastDir == "right")) {
        setTimeout(step, 200 / speedCoeff);
        return;
      }
      if (dir === "up" && lastDir != "down") {
        newPos = {
          x: snake[0].x,
          y: snake[0].y - CELL_SIZE
        };
        lastDir = "up";
      } else if (dir === "right" && lastDir != "left") {
        newPos = {
          x: snake[0].x + CELL_SIZE,
          y: snake[0].y
        };
        lastDir = "right";
      } else if (dir === "down" && lastDir != "up") {
        newPos = {
          x: snake[0].x,
          y: snake[0].y + CELL_SIZE
        };
        lastDir = "down";
      } else if (dir === "left" && lastDir != "right") {
        newPos = {
          x: snake[0].x - CELL_SIZE,
          y: snake[0].y
        };
        lastDir = "left";
      }
      if (isContact(newPos) && score > 0) {
        console.log('troll');
        console.log(snake);
        console.log(newPos);
        // alert("Game over!\nYour score: " + score);
        // document.getElementById("gameOver").innerHTML = "<p>Your score: " + score + "</p>";
        // $( "#gameOver" ).dialog( "open");
        alert.setSubTitle('Your score: ' + score);
        alert.present();

        score = 0;
        
      } else if (!isValid(newPos)) {
          newPos.x = newPos.x % CELLS_COUNT;
          newPos.y = newPos.y % CELLS_COUNT;
      }
      
      else if (newPos.x === food.x && newPos.y === food.y) {
        score++;
        if (score % 5 === 0) {
          speedCoeff += 0.1;
        }
        spawn_food();
        // play('eat');  broken :(
        snake.unshift({
          x: newPos.x,
          y: newPos.y
        });
      } else {
        snake.pop();
        snake.unshift({
          x: newPos.x,
          y: newPos.y
        });
      }
      if (dir != "none" || firstTime) draw();
      setTimeout(step, 200 / speedCoeff);
    }
    init();
    step(true);
  }
}

var JoydivModule;
(function (JoydivModule) {
    var Direction = (function () {
        function Direction(offset) {
            this.offset = {
                x: offset.x,
                y: offset.y
            };
            this.angle = Math.atan2(this.offset.x, this.offset.y);
            if(this.angle < 0) {
                this.angle += Math.PI * 2;
            }
            this.magnitude = Math.sqrt(this.offset.x * this.offset.x + this.offset.y * this.offset.y);
            this.name = this.magnitude ? names[Math.floor((this.angle / (Math.PI / 4)) + 0.5) % 8] : 'none';
        }
        var names = [
            'up', 
            'up-right', 
            'right', 
            'down-right', 
            'down', 
            'down-left', 
            'left', 
            'up-left'
        ];
        return Direction;
    })();
    JoydivModule.Direction = Direction;    
    var Joydiv = (function () {
        function Joydiv(options) {
            this.options = options;
            var _this = this;
            this.arrows = [];
            this.votes = {
            };
            var querySelector = options.querySelector || function (e, selector) {
                return e.querySelector(selector);
            };
            this.rootElement = options.element;
            this.trackpad = querySelector(this.rootElement, '.joydiv-trackpad');
            this.tracker = querySelector(this.trackpad, '.joydiv-tracker');
            var arrowInfo = [
                {
                    name: 'up',
                    direction: new Direction({
                        x: 0,
                        y: 1
                    })
                }, 
                {
                    name: 'right',
                    direction: new Direction({
                        x: 1,
                        y: 0
                    })
                }, 
                {
                    name: 'down',
                    direction: new Direction({
                        x: 0,
                        y: -1
                    })
                }, 
                {
                    name: 'left',
                    direction: new Direction({
                        x: -1,
                        y: 0
                    })
                }
            ];
            this.arrows = this.map(arrowInfo, function (info, i) {
                var arrow = querySelector(_this.rootElement, '.joydiv-' + info.name);
                arrow.addEventListener('mousedown', function (e) {
                    _this.addVote(info.direction, 'arrow-mouse-' + i);
                }, false);
                document.addEventListener('mouseup', function (e) {
                    _this.removeVote('arrow-mouse-' + i);
                }, true);
                arrow.addEventListener('touchstart', function (e) {
                    e.preventDefault();
                    _this.addVote(info.direction, 'arrow-touch-' + i);
                }, false);
                arrow.addEventListener('touchend', function (e) {
                    e.preventDefault();
                    _this.removeVote('arrow-touch-' + i);
                }, true);
                return arrow;
            });
            var onTrackerScreenPos = function (e, origin) {
                var x = 2 * (e.screenX - origin.x) / _this.rootElement.clientWidth;
                var y = 2 * (e.screenY - origin.y) / _this.rootElement.clientHeight;
                _this.tracker.style.left = (x + 0.5) * 100 + "%";
                _this.tracker.style.top = (y + 0.5) * 100 + "%";
                return new Direction({
                    x: x,
                    y: -y
                });
            };
            (function () {
                var origin = null;
                _this.trackpad.addEventListener('mousedown', function (e) {
                    origin = {
                        x: e.screenX,
                        y: e.screenY
                    };
                    e.preventDefault();
                }, false);
                var unmount = function () {
                    origin = null;
                    _this.tracker.style.left = "50%";
                    _this.tracker.style.top = "50%";
                    _this.removeVote('tracker-mouse');
                };
                document.addEventListener('mousemove', function (e) {
                    if(origin) {
                        _this.addVote(onTrackerScreenPos(e, origin), 'tracker-mouse');
                    }
                }, true);
                document.addEventListener('mouseup', unmount, true);
            })();
            (function () {
                var origin = null;
                var touchId = null;
                _this.trackpad.addEventListener('touchstart', function (e) {
                    var touch = e.targetTouches.item(0);
                    touchId = touch.identifier;
                    origin = {
                        x: touch.screenX,
                        y: touch.screenY
                    };
                    e.preventDefault();
                }, false);
                var unmount = function () {
                    origin = null;
                    touchId = null;
                    _this.tracker.style.left = "50%";
                    _this.tracker.style.top = "50%";
                    _this.removeVote('tracker-touch');
                };
                document.addEventListener('touchmove', function (e) {
                    if(origin) {
                        var touch;
                        for(var i = 0; i < e.touches.length; ++i) {
                            if(e.touches.item(i).identifier == touchId) {
                                touch = e.touches.item(i);
                            }
                        }
                        if(touch) {
                            _this.addVote(onTrackerScreenPos(touch, origin), 'tracker-touch');
                        } else {
                            unmount();
                        }
                    }
                }, true);
                _this.each([
                    'touchend', 
                    'touchcancel'
                ], function (eventName) {
                    _this.trackpad.addEventListener(eventName, unmount, true);
                });
            })();
        }
        Joydiv.prototype.each = function (obj, foo) {
            if(obj.length === +obj.length) {
                for(var i = 0, l = obj.length; i < l; i++) {
                    foo(obj[i], i, obj);
                }
            } else {
                for(let i in obj) {
                    if(obj.hasOwnProperty(i)) {
                        foo(obj[i], i, obj);
                    }
                }
            }
        };
        Joydiv.prototype.map = function (obj, foo) {
            var acc = [];
            this.each(obj, function (val, key) {
                acc.push(foo(val, key, obj));
            });
            return acc;
        };
        Joydiv.prototype.addVote = function (direction, voter) {
            this.votes[voter] = direction;
            this.changed();
        };
        Joydiv.prototype.removeVote = function (voter) {
            if(voter in this.votes) {
                delete this.votes[voter];
                this.changed();
            }
        };
        Joydiv.prototype.changed = function () {
            var event = document.createEvent('Event');
            event.initEvent('joydiv-changed', true, false);
            event['detail'] = {
                joydiv: this
            };
            this.rootElement.dispatchEvent(event);
        };
        Joydiv.prototype.getNoneDirection = function () {
            return new Direction({
                x: 0,
                y: 0
            });
        };
        Joydiv.prototype.getSnapped = function (numberOfDirections) {
            var net = this.getRawOneDirection();
            if(net.magnitude) {
                var angleId = Math.round(numberOfDirections * net.angle / (2 * Math.PI)) % numberOfDirections;
                var angle = angleId * (2 * Math.PI / numberOfDirections);
                var base = [
                    Math.sin(angle), 
                    Math.cos(angle)
                ];
                var shadowLength = net.offset.x * base[0] + net.offset.y * base[1];
                return this.getPostProcessed(new Direction({
                    x: base[0] * shadowLength,
                    y: base[1] * shadowLength
                }));
            } else {
                return this.getNoneDirection();
            }
        };
        Joydiv.prototype.getOneOf8Directions = function () {
            return this.getSnapped(8);
        };
        Joydiv.prototype.getOneOf4Directions = function () {
            return this.getSnapped(4);
        };
        Joydiv.prototype.getRawOneDirection = function () {
            var acc = {
                x: 0,
                y: 0
            };
            var cnt = 0;
            this.each(this.votes, function (direction) {
                acc.x += direction.offset.x;
                acc.y += direction.offset.y;
                ++cnt;
            });
            if(!cnt) {
                return this.getNoneDirection();
            } else {
                return new Direction({
                    x: acc.x / cnt,
                    y: acc.y / cnt
                });
            }
        };
        Joydiv.prototype.getOneDirection = function () {
            return this.getPostProcessed(this.getRawOneDirection());
        };
        Joydiv.prototype.getAllDirections = function () {
            var _this = this;
            return this.map(this.votes, function (direction) {
                return _this.getPostProcessed(direction);
            });
        };
        Joydiv.prototype.getPostProcessed = function (direction) {
            direction = new Direction(direction.offset);
            if(this.options.clampX) {
                var m = Math.abs(direction.offset.x);
                if(this.options.clampX < m) {
                    direction.offset.x /= m;
                    direction.offset.x *= this.options.clampX;
                }
            }
            if(this.options.clampY) {
                var m = Math.abs(direction.offset.y);
                if(this.options.clampY < m) {
                    direction.offset.y /= m;
                    direction.offset.y *= this.options.clampY;
                }
            }
            if(this.options.clampMagnitude) {
                var m = Math.sqrt(direction.offset.y * direction.offset.y + direction.offset.x * direction.offset.x);
                if(this.options.clampMagnitude < m) {
                    direction.offset.x /= m;
                    direction.offset.x *= this.options.clampMagnitude;
                    direction.offset.y /= m;
                    direction.offset.y *= this.options.clampMagnitude;
                }
            }
            var newDir = new Direction(direction.offset);
            if(this.options.flipY) {
                newDir.offset.y *= -1;
                newDir.angle = (Math.PI * 3 - newDir.angle) % (Math.PI * 2);
            }
            return newDir;
        };
        return Joydiv;
    })();
    JoydivModule.Joydiv = Joydiv;    
})(JoydivModule || (JoydivModule = {}));

