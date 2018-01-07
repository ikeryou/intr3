

// 動かすオブジェクト
tgList = [];

init();


// 初期設定
function init() {

  $('.mv .dot').each(function(i,e) {

    // ステージサイズ
    sw = window.innerWidth
    sh = window.innerHeight

    // 位置のばらつき
    xrange = 0.3
    yrange = 0.3
    zrange = 0.5

    // 速度
    zspeed = 1

    // 全体の速さ
    allSpeed = 0.75

    // 大きさのばらつき
    scaleMin = 0.2
    scaleMax = 1

    // 動かすオブジェクト管理
    // el         : 対象のjqueryエレメント
    // x,y,z      : 位置
    // speedX,Y,Z : 回転速度
    // scale      : 大きさ
    tgList.push({
      el:$(e),
      x:random(-sw * xrange, sw * xrange),
      y:random(-sh * yrange, sh * yrange),
      z:random(-sh * zrange, sh * zrange),
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
    rotateZ(o, radian(o.speedZ));

    TweenMax.set(o.el, {
      scale:o.scale,
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
