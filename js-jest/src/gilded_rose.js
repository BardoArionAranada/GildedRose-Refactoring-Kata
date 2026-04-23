const AGED_BRIE = 'Aged Brie';
const SULFURAS = 'Sulfuras, Hand of Ragnaros';
const BACKSTAGE_PASSES = 'Backstage passes to a TAFKAL80ETC concert';
const CONJURED = 'Conjured Mana Cake';
const MIN_QUALITY = 0;
const MAX_QUALITY = 50;
const BACKSTAGE_SECOND_BONUS_DAY = 11;
const BACKSTAGE_THIRD_BONUS_DAY = 6;

class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class ItemUpdater {
  constructor(item) {
    this.item = item;
  }

  update() {
    this.updateQualityBeforeSellIn();
    this.decreaseSellIn();
    this.updateQualityAfterSellIn();
  }

  updateQualityBeforeSellIn() {}

  updateQualityAfterSellIn() {}

  increaseQuality() {
    this.item.quality = Math.min(MAX_QUALITY, this.item.quality + 1);
  }

  decreaseQuality() {
    this.item.quality = Math.max(MIN_QUALITY, this.item.quality - 1);
  }

  decreaseSellIn() {
    this.item.sellIn = this.item.sellIn - 1;
  }

  resetQuality() {
    this.item.quality = MIN_QUALITY;
  }

  isExpired() {
    return this.item.sellIn < 0;
  }
}

class NormalItemUpdater extends ItemUpdater {
  updateQualityBeforeSellIn() {
    if (this.item.quality <= MIN_QUALITY) {
      return;
    }

    this.decreaseQuality();
  }

  updateQualityAfterSellIn() {
    if (!this.isExpired()) {
      return;
    }

    this.updateQualityBeforeSellIn();
  }
}

class AgedBrieItemUpdater extends ItemUpdater {
  updateQualityBeforeSellIn() {
    if (this.item.quality >= MAX_QUALITY) {
      return;
    }

    this.increaseQuality();
  }

  updateQualityAfterSellIn() {
    if (!this.isExpired()) {
      return;
    }

    this.updateQualityBeforeSellIn();
  }
}

class BackstagePassItemUpdater extends ItemUpdater {
  updateQualityBeforeSellIn() {
    if (this.item.quality >= MAX_QUALITY) {
      return;
    }

    this.increaseQuality();

    if (this.item.sellIn < BACKSTAGE_SECOND_BONUS_DAY) {
      this.increaseQuality();
    }

    if (this.item.sellIn < BACKSTAGE_THIRD_BONUS_DAY) {
      this.increaseQuality();
    }
  }

  updateQualityAfterSellIn() {
    if (!this.isExpired()) {
      return;
    }

    this.resetQuality();
  }
}

class ConjuredItemUpdater extends ItemUpdater {
  updateQualityBeforeSellIn() {
    this.decreaseQuality();
    this.decreaseQuality();
  }

  updateQualityAfterSellIn() {
    if (!this.isExpired()) {
      return;
    }

    this.decreaseQuality();
    this.decreaseQuality();
  }
}

class SulfurasItemUpdater extends ItemUpdater {
  update() {}
}

class ItemUpdaterFactory {
  static forItem(item) {
    if (item.name === AGED_BRIE) {
      return new AgedBrieItemUpdater(item);
    }

    if (item.name === BACKSTAGE_PASSES) {
      return new BackstagePassItemUpdater(item);
    }

    if (item.name === CONJURED) {
      return new ConjuredItemUpdater(item);
    }

    if (item.name === SULFURAS) {
      return new SulfurasItemUpdater(item);
    }

    return new NormalItemUpdater(item);
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
  }

  updateQuality() {
    for (const item of this.items) {
      ItemUpdaterFactory.forItem(item).update();
    }

    return this.items;
  }
}

module.exports = {
  Item,
  Shop
}
