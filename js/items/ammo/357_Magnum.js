/**
 * Created by Karim Khairalla on 09.02.2015.
 */
function $357_Magnum(type, rounds) {
    if(type == undefined) 	type = Ammo.TYPE_BALL;
    if(rounds == undefined) rounds = 6;

    Ammo.call(this, Ammo.$357_Magnum, {
        name: '.357 Magnum',
        weight: 0.1,
        size: Item.SMALL,
        type: type,
        rounds: rounds
    });
}

$357_Magnum.prototype = new Ammo();
$357_Magnum.constructor = $357_Magnum;