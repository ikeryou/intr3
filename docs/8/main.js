

// 動かすオブジェクト
tgList = [];

// マウス位置
mouse = {x:0, y:0, isDown:false};

init();

// 初期設定
function init() {

  $('.mv .inner').each(function(i,e) {

    sw = window.innerWidth
    sh = window.innerHeight

    color = [
      0x74c9a0,
      0xe94dd2,
      0x579df8,
      0xf4bce8
    ]
    shuffle(color);

    speed = 1
    range = 0.2

    speedX = random(1, 2) * speed;
    speedY = random(1, 2) * speed;
    speedZ = random(1, 2) * speed;

    tgList.push({
      el:$(e),
      x:random(-sw * range, sw * range),
      y:random(-sw * range, sw * range),
      z:random(-sw * range, sw * range),
      distX:0,
      distY:0,
      scale:1,
      scaleOffset:random(10, 40),
      scaleOffset2:random(5, 30),
      fl:400,
      ease:random(0.01, 0.1),
      speedX:speedX,
      speedY:speedY,
      speedZ:speedZ,
      angle1:random(0, 360),
      angle2:random(0, 360),
      angle3:random(0, 360),
      centerX:sw * 0.5,
      centerY:sh * 0.5,
      color1:color[0],
      color2:color[1],
      color3:color[2],
      color4:color[3]
    })

  });

  $(window).on('mousemove', _eMouseMove).on('mousedown', _eMouseDown).on('mouseup', _eMouseUp);

}

function _eMouseDown(e) {
  mouse.isDown = true;
  $('.mv .inner.is-layer').css({
    display:'none'
  });
}

function _eMouseUp(e) {
  mouse.isDown = false;
  $('.mv .inner.is-layer').css({
    display:''
  });
}

// ----------------------------------------
// マウス位置取得
// ----------------------------------------
function _eMouseMove(e) {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
}

// 毎フレーム実行
window.requestAnimationFrame(update);
function update() {

  // ステージサイズ
  sw = window.innerWidth;
  sh = window.innerHeight;

  num = tgList.length;
  for(var i = 0; i < num; i++) {

    o = tgList[i];
    if(mouse.isDown) {
      rotateX(o, radian(2));
      rotateY(o, radian(o.speedY * 0));
      rotateZ(o, radian(o.speedZ * 0));
    } else {
      rotateX(o, radian(o.speedX));
      rotateY(o, radian(o.speedY));
      rotateZ(o, radian(o.speedZ));
    }
    perspective(o, o.fl);

    ease = o.ease;
    o.centerX += (mouse.x - o.centerX) * ease;
    o.centerY += (mouse.y - o.centerY) * ease;

    p1 = 0;
    p2 = o.scale * o.scaleOffset;
    p3 = p2 + o.scaleOffset2;

    x = o.distX;
    y = o.distY;

    color1 = chroma.mix(o.color1, o.color2, map(Math.sin(radian(o.angle1)), 0, 1, -1, 1)).css();
    color2 = chroma.mix(o.color2, o.color3, map(Math.sin(radian(o.angle2)), 0, 1, -1, 1)).css();
    color3 = chroma.mix(o.color3, o.color4, map(Math.sin(radian(o.angle3)), 0, 1, -1, 1)).css();

    o.angle1 += o.speedX * 2;
    o.angle2 += o.speedY * 2.3;
    o.angle3 += o.speedZ * 1.2;

    grad = 'radial-gradient(circle farthest-corner at ' + x + 'px ' + y + 'px, ' + color1 + ' ' + p1 + '%, ' + color2 + ' ' + p2 + '%, ' + color3 + ' ' + p3 + '%)';

    o.el.css({
      backgroundImage:grad
    })

  }

  window.requestAnimationFrame(update);
}


// ----------------------------------------
// X軸の回転
// obj   : x,y,zの位置情報をもつオブジェクト
// angle : 移動角度(ラジアン)
// ----------------------------------------
function rotateX(obj, angle) {

  cos = Math.cos(angle);
  sin = Math.sin(angle);

  y = obj.y * cos - obj.z * sin;
  z = obj.z * cos + obj.y * sin;

  obj.y = y;
  obj.z = z;

}

// ----------------------------------------
// Y軸の回転
// obj   : x,y,zの位置情報をもつオブジェクト
// angle : 移動角度(ラジアン)
// ----------------------------------------
function rotateY(obj, angle) {

  cos = Math.cos(angle);
  sin = Math.sin(angle);

  x = obj.x * cos - obj.z * sin;
  z = obj.z * cos + obj.x * sin;

  obj.x = x;
  obj.z = z;

}

// ----------------------------------------
// Z軸の回転
// obj   : x,y,zの位置情報をもつオブジェクト
// angle : 移動角度(ラジアン)
// ----------------------------------------
function rotateZ(obj, angle) {

  cos = Math.cos(angle);
  sin = Math.sin(angle);

  x = obj.x * cos - obj.y * sin;
  y = obj.y * cos + obj.x * sin;

  obj.x = x;
  obj.y = y;

}


// ----------------------------------------
//
// ----------------------------------------
function perspective(obj, fl) {

  // if(obj.z > -fl) {
  //
  // } else {
  //   obj.scale = 0;
  // }

  obj.scale = fl / (fl + obj.z);
  obj.distX = o.centerX + obj.x * obj.scale;
  obj.distY = o.centerY + obj.y * obj.scale;

}

// ----------------------------------------
// 度からラジアンに変換
// @val : 度
// ----------------------------------------
function radian(val) {
  return val * Math.PI / 180;
}

// ----------------------------------------
// ラジアンから度に変換
// @val : ラジアン
// ----------------------------------------
function degree(val) {
  return val * 180 / Math.PI;
}

// ----------------------------------------
// minからmaxまでランダム
// ----------------------------------------
function random(min, max) {
  return Math.random() * (max - min) + min;
}

// ----------------------------------------
// 範囲変換
// @val     : 変換したい値
// @toMin   : 変換後の最小値
// @toMax   : 変換後の最大値
// @fromMin : 変換前の最小値
// @fromMax : 変換前の最大値
// ----------------------------------------
function map(val, toMin, toMax, fromMin, fromMax) {
  if(val <= fromMin) {
    return toMin;
  }
  if(val >= fromMax) {
    return toMax;
  }
  p = (toMax - toMin) / (fromMax - fromMin);
  return ((val - fromMin) * p) + toMin;
}


function shuffle(arr) {

  i = arr.length;
  while(--i) {
    j = Math.floor(Math.random() * (i + 1));
    if(i == j) {
      continue;
    }
    k = arr[i];
    arr[i] = arr[j];
    arr[j] = k;
  }

}
