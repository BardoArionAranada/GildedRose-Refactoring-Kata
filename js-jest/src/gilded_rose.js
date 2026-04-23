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

      this._updateItemQuality(item);

      if (!this._isSulfuras(item)) {
        item.sellIn = item.sellIn - 1;
      }

      this._updateExpiredItemQuality(item);
    }

    return this.items;
  }

  _updateItemQuality(item) {
    if (this._isAgedBrie(item)) {
      this._updateAgedBrie(item);
      return;
    }

    if (this._isBackstagePass(item)) {
      this._updateBackstagePass(item);
      return;
    }

    this._updateNormalItem(item);
  }

  _updateNormalItem(item) {
    if (item.quality > 0 && !this._isSulfuras(item)) {
      item.quality = item.quality - 1;
    }
  }

  _updateAgedBrie(item) {
    if (item.quality < 50) {
      item.quality = item.quality + 1;
    }
  }

  _updateBackstagePass(item) {
    if (item.quality < 50) {
      item.quality = item.quality + 1;
      if (item.sellIn < 11 && item.quality < 50) {
        item.quality = item.quality + 1;
      }
      if (item.sellIn < 6 && item.quality < 50) {
        item.quality = item.quality + 1;
      }
    }
  }

  _updateExpiredItemQuality(item) {
    if (item.sellIn < 0) {
      if (this._isAgedBrie(item)) {
        this._updateAgedBrie(item);
        return;
      }

      if (this._isBackstagePass(item)) {
        item.quality = item.quality - item.quality;
        return;
      }

      this._updateNormalItem(item);
    }
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
