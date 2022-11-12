const Product = require("./model/product");

const dummy = [
  {
    product_name: "Samsung Galaxy S20 FE 6G ",
    price: "29990",
    image: "src/uploads/samsung.jpg",
    category: "Electronics",
    countInStock: 10,
    brand: "Samsung",
    numReviews: 4,
    rating: 5,
    discription:
      "5G Ready powered by Qualcomm Snapdragon 865 Octa-Core processor, 8GB RAM, 128GB internal memory expandable up to 1TB, Android 11.0 operating system and dual SIM",
  },
  {
    product_name: "Samsung Galaxy S20 FE 7G ",
    price: "29990",
    image: "src/uploads/samsung.jpg",
    category: "Electronics",
    countInStock: 5,
    brand: "Samsung",
    numReviews: 0,
    rating: 3,
    discription:
      "5G Ready powered by Qualcomm Snapdragon 865 Octa-Core processor, 8GB RAM, 128GB internal memory expandable up to 1TB, Android 11.0 operating system and dual SIM",
  },
  {
    product_name: "Samsung Galaxy S20 FE 8G ",
    price: "29990",
    image: "src/uploads/samsung.jpg",
    category: "Electronics",
    countInStock: 18,
    brand: "Samsung",
    numReviews: 2,
    rating: 1,
    discription:
      "5G Ready powered by Qualcomm Snapdragon 865 Octa-Core processor, 8GB RAM, 128GB internal memory expandable up to 1TB, Android 11.0 operating system and dual SIM",
  },
];
class Seeder {
  static async importData() {
    try {
      const sampleProduct = dummy.map((item) => {
        return { ...item };
      });
      console.log(sampleProduct);
      await Product.insertMany(sampleProduct);
      console.log("data Imported".green.inverse);
      process.exit();
    } catch (error) {
      process.exit(1);
    }
  }
}

Seeder.importData();
