import Images from './Images.js';
import Utils from './Utils.js';



export default class Player {

    constructor() {
        this.x = Utils.randomIntFromRange(10, 100);
        this.y = Utils.randomIntFromRange(50, 200);
        this.w = 34;
        this.h = 24;
        this.sprites = [
            [
                Images.ImgBirdBlue,
                Images.ImgBirdBlueUpFlap,
                Images.ImgBirdBlue,
                Images.ImgBirdBlueDownFlap
            ]
        ];
        this.spriteActive = 0;
        this.spriteSelected = 0;
        this.dy = 0;
    }

    jump(power) {
        this.dy = -(power);
    }
}