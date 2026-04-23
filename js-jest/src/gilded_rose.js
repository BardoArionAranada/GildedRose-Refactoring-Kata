const AGED_BRIE = 'Aged Brie';
const SULFURAS = 'Sulfuras, Hand of Ragnaros';
const BACKSTAGE_PASSES = 'Backstage passes to a TAFKAL80ETC concert';

class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
  }
  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];

      if (this._isSulfuras(item)) {
        continue;
      }

      this._updateItemQuality(item);
      item.sellIn = item.sellIn - 1;
      this._updateExpiredItemQuality(item);
    }

    return this.items;
  }

  _updateItemQuality(item) {
    if (this._isAgedBrie(item)) return this._updateAgedBrie(item);
    if (this._isBackstagePass(item)) return this._updateBackstagePass(item);

    this._updateNormalItem(item);
  }

  _updateNormalItem(item) {
    if (item.quality <= 0) return;

    this._decreaseQuality(item);
  }

  _updateAgedBrie(item) {
    if (item.quality >= 50) return;

    this._increaseQuality(item);
  }

  _updateBackstagePass(item) {
    if (item.quality >= 50) return;

    this._increaseQuality(item);

    if (item.sellIn < 11) {
      this._increaseQuality(item);
    }

    if (item.sellIn < 6) {
      this._increaseQuality(item);
    }
  }

  _updateExpiredItemQuality(item) {
    if (item.sellIn >= 0) {
      return;
    }

    if (this._isAgedBrie(item)) {
      this._updateAgedBrie(item);
      return;
    }

    if (this._isBackstagePass(item)) {
      item.quality = 0;
      return;
    }

    this._updateNormalItem(item);
  }

  _increaseQuality(item) {
    item.quality = Math.min(50, item.quality + 1);
  }

  _decreaseQuality(item) {
    item.quality = Math.max(0, item.quality - 1);
  }

  _isAgedBrie(item) {
    return item.name == AGED_BRIE;
  }

  _isBackstagePass(item) {
    return item.name == BACKSTAGE_PASSES;
  }

  _isSulfuras(item) {
    return item.name == SULFURAS;
  }
}

module.exports = {
  Item,
  Shop
}
