

// 動かすオブジェクト
tgList = [];

init();


// 初期設定
function init() {

  // パーティクル数
  num = 20

  html = '';
  color = ['colorA', 'colorB', 'colorC', 'colorA'];
  blend = ['blendA', 'blendB', 'blendC', 'blendD'];
  for(var i = 0; i < num; i++) {
    html += '<div class="dot ' + blend[i%blend.length] + '"><div class="inner ' + color[i%color.length] + '"></div></div>';
  }
  $('.mv').html(html)

  $('.mv .dot').each(function(i,e) {

    // ステージサイズ
    sw = window.innerWidth
    sh = window.innerHeight

    // 速度
    xspeed = 1;
    yspeed = xspeed;
    zspeed = xspeed;

    // 全体の速さ
    allSpeed = 1;

    // 大きさのばらつき
    scaleMin = 1
    scaleMax = 1

    x = y = z = sw * 0.05;

    // 動かすオブジェクト管理
    // el         : 対象のjqueryエレメント
    // x,y,z      : 位置
    // speedX,Y,Z : 回転速度
    // scale      : 大きさ
    tgList.push({
      el:$(e),
      x:x,
      y:y,
      z:z,
      speedX:xspeed * allSpeed,
      speedY:yspeed * allSpeed,
      speedZ:zspeed * allSpeed,
      scale:random(scaleMin, scaleMax),
      angle:i * 13
    })
  });

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
    rotateX(o, radian(o.speedX));
    rotateY(o, radian(o.speedY));
    rotateZ(o, radian(o.speedZ));

    // 位置、スケールを少し動かす
    o.angle += 5;
    range = 0.075;
    x = map(Math.sin(radian(o.angle)), -sw * range, sw * range, -1, 1);
    y = map(Math.cos(radian(o.angle)), -sh * range, sh * range, -1, 1);
    s = map(Math.sin(radian(o.angle)), 0, 0.25, -1, 1);

    TweenMax.set(o.el, {
      scale:o.scale + s,
      x:o.x + window.innerWidth * 0.5 + x,
      y:o.y + window.innerHeight * 0.5 + y,
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
