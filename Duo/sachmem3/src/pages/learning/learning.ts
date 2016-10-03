import { Component, OnInit, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { WordService } from '../../providers/word-service';
import { NativeService } from '../../providers/native-service';
import { Playing } from '../playing/playing';

/*
  Generated class for the Learning page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-learning',
  templateUrl: 'learning.html',
   providers: [ WordService, NativeService ]
})
export class Learning implements OnInit {
  words: Object[] = [];
  curWord: Object;
  curNum: number = 0;
  pageType: number; // Loại trang; 0 = training, 1 = review;

  constructor(private navCtrl: NavController, private navParams: NavParams, private wordService: WordService, private nativeService: NativeService) { }

  ngOnInit(): void { 
  	let unitId = this.navParams.get('unitId');
    let word = this.navParams.get('word');

    if (unitId != undefined) {
      this.pageType = 0;
      this.wordService.getWords(unitId).then(res => {
        this.words = res;
        this.reload();
      });
    } else {
      this.pageType = 1;
      this.words = [ word ];
      this.reload();
    }
  }

  reload(): void {
    this.curWord = this.words[this.curNum];
    this.speak();
  }

  next() {
    this.curNum ++;
    this.reload();
  }

  previous() {
    this.curNum --;
    this.reload(); 
  }

  isEnd(): boolean {
    if (this.curNum >= this.words.length - 1) return true;
    return false;
  }

  isBegin(): boolean {
    if (this.curNum <= 0) return true;
    return false;
  }

  enterFightingPage() {
    this.navCtrl.push(Playing, {
      unitId: this.navParams.get('unitId')
    });
  }

  back(): void {
    this.navCtrl.pop();
  }

  speak(): void {
    this.nativeService.tts(this.curWord['content']);
  }

  ionViewDidLoad() {
    console.log('Hello Learning Page');
  }

}
