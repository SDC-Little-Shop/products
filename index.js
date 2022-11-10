const express = require('express');
const path = require('path');
const app = express();
const port = 3001;
const {sql} = require('./db/sqlDb.js')

app.use(express.json());

app.get('/products', (req, res) => {
  let count = 5

  async function getProducts() {
    let query = await sql`
    SELECT *
    FROM products
    LIMIT ${count};
    `
    return query;
  }

  getProducts()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log(err);
    })
})


app.get('/products/:id', (req, res) => {
  let productId = req.params.id;

  async function getOneProduct() {
    let query = await sql`
    SELECT *, features.feature, features.value
    FROM products
    JOIN features
    ON products.id = features.product_id
    WHERE products.id = ${productId};`
    return query;
  }



  getOneProduct()
    .then((data) => {
      let result = {
        id: productId,
        name: data[0].name,
        slogan: data[0].slogan,
        description: data[0].description,
        category: data[0].category,
        default_price: data[0].default_price,
        features: []
      }
      for (let i = 0; i < data.length; i++) {
        let featureObject = {
          'feature': data[i].feature,
          'value': data[i].value
        }
        result.features.push(featureObject);
      }
      console.log(result)
      res.status(200).send(result);
    })
    .catch((err) => {
      console.log(err);
    })
})

app.get('/products/:id/styles', (req, res) => {
  let productId = req.params.id;

  async function getStyles() {
    let query = await sql`
    SELECT * FROM styles
    WHERE productid = ${productId};
    `
    return query;
  }

  async function getSkus(styleId) {
    let query = await sql`
    SELECT skus.id, skus.styleid, skus.size, skus.quantity FROM styles
    JOIN skus ON styles.id = skus.styleid
    WHERE styles.productid = 1;
    `
    return query;
  }

  async function getPhotos() {
    let query = await sql`
    SELECT photos.styleid,
    styles.productid,
    photos.url,
    photos.thumbnail_url
    FROM styles
    JOIN photos ON styles.id = photos.styleid
    WHERE productid = 1;
    `
    return query;
  }

  let stylesResult = {
    product_id: Number(productId),
    results: []
  }

  const convertBoolean = (data) => {
    if (data === 0) {
      return false;
    } else {
      return true;
    }
  }

  const convertPrice = (price) => {
    if (price === 'null') {
      return null;
    } else {
      return `${price}.00`;
    }
  }

  getStyles()
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        let styleObject = {
          styleId: data[i].id,
          name: data[i].name,
          original_price: `${data[i].original_price}.00`,
          sale_price: convertPrice(data[i].sale_price),
          'default?': convertBoolean(data[i].default_style),
          photos: [],
          skus: {}
        }
        stylesResult.results.push(styleObject)
      }
    })
    .then(() => {
      return getSkus()
    })
    .then((data) => {
      let skusObject = {};
      for (let i = 0; i < data.length; i++) {
        if (skusObject[data[i].styleid] === undefined) {
          skusObject[data[i].styleid] = {[data[i].id]: {size: data[i].size, quantity: data[i].quantity}}
        } else {
          skusObject[data[i].styleid][data[i].id] = {size: data[i].size, quantity: data[i].quantity}}
      }

      for (let i = 0; i < stylesResult.results.length; i++) {
        let ident = stylesResult.results[i].styleId
        stylesResult.results[i].skus = skusObject[stylesResult.results[i].styleId]
      }
    })
    .then(() => {
      return getPhotos()
    })
    .then((data) => {
      let photosObject = {};
      for (let i = 0; i < data.length; i++) {
        if (photosObject[data[i].styleid ]=== undefined) {
          photosObject[data[i].styleid] = [{thumbnail_url: data[i].thumbnail_url, url: data[i].url}]
        } else {
          photosObject[data[i].styleid].push({thumbnail_url: data[i].thumbnail_url, url: data[i].url})
        }
      }

      for (let i = 0; i < stylesResult.results.length; i++) {
        let ident = stylesResult.results[i].styleId
        stylesResult.results[i].photos = photosObject[stylesResult.results[i].styleId]
      }
      res.status(200).send(stylesResult);
    })
    .catch((err) => {
      console.log(err);
    })
})




app.get('/products/:id/related', (req, res) => {
  let productId = req.params.id;

  async function getRelated() {
    let query = await sql`
    SELECT related.related_product_id
    FROM products
    JOIN related ON products.id = related.current_product_id
    WHERE products.id = ${productId};
    `
    return query;
  }

  getRelated()
    .then((data) => {
      let relatedIds = [];
      for (let i = 0; i < data.length; i++) {
        relatedIds.push(data[i].related_product_id);
      }
      res.status(200).send(relatedIds);
    })
    .catch((err) => {
      console.log(err);
    })
})


app.listen(port);
console.log(`Server listening at http://localhost:${port}`);