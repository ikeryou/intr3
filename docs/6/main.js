

// 動かすオブジェクト
tgList = [];

init();


// 初期設定
function init() {

  // パーティクル数
  num = 60;

  html = '';
  color = ['colorA', 'colorB', 'colorC', 'colorD', 'colorE', 'colorF'];
  for(var i = 0; i < num; i++) {
    html += '<div class="dot"><div class="inner ' + color[i%color.length] + '"></div></div>';
  }
  $('.mv').html(html)

  $('.mv .dot').each(function(i,e) {

    // ステージサイズ
    sw = window.innerWidth
    sh = window.innerHeight

    // 位置のばらつき
    xrange = 0.15
    yrange = 0.15
    zrange = 0.15

    // 速度
    xspeed = 1
    yspeed = 1
    zspeed = 1
    if(random(0, 1) < 0.5) {
      xspeed *= -1
      yspeed *= -1
      zspeed *= -1
    }

    // 全体の速さ
    allSpeed = 0.5

    // 大きさのばらつき
    scaleMin = 0.1
    scaleMax = 0.6

    // 動かすオブジェクト管理
    // el         : 対象のjqueryエレメント
    // x,y,z      : 位置
    // speedX,Y,Z : 回転速度
    // scale      : 大きさ
    tgList.push({
      el:$(e),
      x:random(sw * xrange * 0.8, sw * xrange),
      y:random(sh * yrange * 0.8, sh * yrange),
      z:random(sh * zrange * 0.8, sh * zrange),
      speedX:random(1, 4) * xspeed * allSpeed,
      speedY:random(1, 4) * yspeed * allSpeed,
      speedZ:random(1, 4) * zspeed * allSpeed,
      scale:random(scaleMin, scaleMax)
    })
  });

}

// 毎フレーム実行
window.requestAnimationFrame(update);
function update() {

  num = tgList.length;
  for(var i = 0; i < num; i++) {
    o = tgList[i];
    rotateX(o, radian(o.speedX));
    rotateY(o, radian(o.speedY));
    rotateZ(o, radian(o.speedZ));

    TweenMax.set(o.el, {
      scale:o.scale,
      rotationZ:o.z * 10,
      x:o.x + window.innerWidth * 0.5,
      y:o.y + window.innerHeight * 0.5,
      z:o.z
    });
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
