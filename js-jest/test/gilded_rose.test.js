const {Shop, Item} = require("../src/gilded_rose");

describe("Gilded Rose", function() {
  const updateItem = (name, sellIn, quality) => {
    const gildedRose = new Shop([new Item(name, sellIn, quality)]);
    return gildedRose.updateQuality()[0];
  };

  describe("normal items", function() {
    it("decreases quality by 1 before the sell date", function() {
      const item = updateItem("Normal Item", 10, 20);

      expect(item.sellIn).toBe(9);
      expect(item.quality).toBe(19);
    });

    it("decreases quality by 2 once the sell date has passed", function() {
      const item = updateItem("Normal Item", 0, 20);

      expect(item.sellIn).toBe(-1);
      expect(item.quality).toBe(18);
    });

    it("never decreases quality below 0", function() {
      const item = updateItem("Normal Item", 5, 0);

      expect(item.sellIn).toBe(4);
      expect(item.quality).toBe(0);
    });

    it("treats an unknown item name as a normal item", function() {
      const item = updateItem("Elixir of the Mongoose", 3, 7);

      expect(item.sellIn).toBe(2);
      expect(item.quality).toBe(6);
    });
  });

  describe("Aged Brie", function() {
    it("increases quality by 1 before the sell date", function() {
      const item = updateItem("Aged Brie", 5, 10);

      expect(item.sellIn).toBe(4);
      expect(item.quality).toBe(11);
    });

    it("increases quality by 2 once the sell date has passed", function() {
      const item = updateItem("Aged Brie", 0, 10);

      expect(item.sellIn).toBe(-1);
      expect(item.quality).toBe(12);
    });

    it("never increases quality above 50", function() {
      const item = updateItem("Aged Brie", 5, 50);

      expect(item.sellIn).toBe(4);
      expect(item.quality).toBe(50);
    });
  });

  describe("Sulfuras", function() {
    it("never changes quality or sellIn", function() {
      const item = updateItem("Sulfuras, Hand of Ragnaros", 0, 80);

      expect(item.sellIn).toBe(0);
      expect(item.quality).toBe(80);
    });

    it("stays unchanged even before the sell date", function() {
      const item = updateItem("Sulfuras, Hand of Ragnaros", 10, 80);

      expect(item.sellIn).toBe(10);
      expect(item.quality).toBe(80);
    });
  });

  describe("Backstage passes", function() {
    const backstagePass = "Backstage passes to a TAFKAL80ETC concert";

    it("increases quality by 1 when there are more than 10 days left", function() {
      const item = updateItem(backstagePass, 15, 20);

      expect(item.sellIn).toBe(14);
      expect(item.quality).toBe(21);
    });

    it("increases quality by 2 when there are 10 days or less", function() {
      const item = updateItem(backstagePass, 10, 20);

      expect(item.sellIn).toBe(9);
      expect(item.quality).toBe(22);
    });

    it("increases quality by 3 when there are 5 days or less", function() {
      const item = updateItem(backstagePass, 5, 20);

      expect(item.sellIn).toBe(4);
      expect(item.quality).toBe(23);
    });

    it("drops quality to 0 after the concert", function() {
      const item = updateItem(backstagePass, 0, 20);

      expect(item.sellIn).toBe(-1);
      expect(item.quality).toBe(0);
    });

    it("never increases quality above 50 before the concert", function() {
      const item = updateItem(backstagePass, 5, 49);

      expect(item.sellIn).toBe(4);
      expect(item.quality).toBe(50);
    });
  });

  describe("Conjured", function() {
    const conjuredItem = "Conjured Mana Cake";

    it("decreases quality by 2 before the sell date", function() {
      const item = updateItem(conjuredItem, 10, 20);

      expect(item.sellIn).toBe(9);
      expect(item.quality).toBe(18);
    });

    it("decreases quality by 4 once the sell date has passed", function() {
      const item = updateItem(conjuredItem, 0, 20);

      expect(item.sellIn).toBe(-1);
      expect(item.quality).toBe(16);
    });

    it("never decreases quality below 0", function() {
      const item = updateItem(conjuredItem, 5, 1);

      expect(item.sellIn).toBe(4);
      expect(item.quality).toBe(0);
    });
  });
});
