import { Op } from 'sequelize';
import { modelProduct } from '../models/index.js';

const getProducts = async (req, res) => {
  const { name, category, pMin, pMax, dMin, dMax } = req.body;

  let response;
  try {
    response = await filterProducs(name, category, pMin, pMax, dMin, dMax);
    if (!Array.isArray(response)) {
      // console.log(response);
      // return res.send({ msg: response.msg }).status(response.status);
      return res.status(response.status).send(`${response.msg}`);
    }
    res.send(response);
  } catch (error) {
    res.status(500).send({ msg: `Could not find any products, ${error}` });
  }
};
const getPrices = async (req, res) => {
  try {
    let prices = await modelProduct.findAll({ attributes: ['price'] });
    if (!prices.length)
      return res.status(404).send({ msg: `There is no any prices available` });

    res.send(prices);
  } catch (error) {
    res.status(500).send({ msg: `Internal server error, ${error}` });
  }
};
const getDiscounts = async (req, res) => {
  try {
    let disconts = await modelProduct.findAll({ attributes: ['discount'] });
    if (!disconts.length)
      return res
        .status(404)
        .json({ msg: `There is no any discount available or its cero` });

    res.send(disconts);
  } catch (error) {
    res.status(500).send({ msg: `Internal server error, ${error}` });
  }
};
const filterProducs = async (name, category, pMin, pMax, dMin, dMax) => {
  if ((pMin && !pMax) || (pMax && !pMin))
    return {
      msg: 'and attribute missing: min price or max price',
      status: 404,
    };
  if (dMin && !dMax) dMax = 100;
  if (dMax && !dMin) dMin = 0;
  if (category && !isArrayOfInteger(category))
    return { msg: 'Bad request, id category should be integer', status: 400 };

  let where = {};
  // if exist some attribute to filter, it will be added into where option
  if (name) where.name = { [Op.substring]: `${name}` };
  if (pMin && pMax) where.price = { [Op.between]: [pMin, pMax] };
  if (dMin && dMax) where.discount = { [Op.between]: [dMin, dMax] };
  if (category && category?.length) where.category = { [Op.or]: category };

  try {
    let res = await modelProduct.findAll({ where });
    if (name && !res.length)
      return {
        msg: `Any match with '${name}', please try with a different word`,
        status: 404,
      };
    return res;
  } catch (error) {
    return { msg: error.message, status: 500 };
  }
};

function isArrayOfInteger(category) {
  let res = true;
  for (let e of category) {
    if (!Number.isInteger(parseInt(e))) return (res = false);
  }
  return res;
}
export { getProducts, getPrices, getDiscounts };
