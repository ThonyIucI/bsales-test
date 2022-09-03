import { Op } from 'sequelize';
import { modelProduct } from '../models/index.js';

const getProducts = async (req, res) => {
  const { name, pMin, pMax, dMin, dMax } = req.query;
  let response;

  try {
    if (name || pMin || dMin) {
      response = await filterProducs(name, pMin, pMax, dMin, dMax);
      if (name && !response.length) {
        res.status(404).send({
          msg: `Any match with '${name}', please try with a different word`,
        });
      } else if (pMin || (dMin && response.msg)) {
        res.status(404).send(response);
      } else {
        res.send(response);
      }
    } else {
      response = await modelProduct.findAll();
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(500).send({ msg: 'Could not find any products', error });
  }
};

const filterProducs = async (name, pMin, pMax, dMin, dMax) => {
  if ((pMin && !pMax) || (pMax && !pMin))
    return { msg: 'and attribute missing: min price or max price' };
  if ((dMin && !dMax) || (dMax && !dMin))
    return { msg: 'and attribute missing: min discount or max discount' };
  let where = {};
  // if exist some attribute to filter, it will be added into where option
  if (name) where.name = { [Op.substring]: `${name}` };
  if (pMin && pMax) where.price = { [Op.between]: [pMin, pMax] };
  if (dMin && dMax) where.discount = { [Op.between]: [dMin, dMax] };

  try {
    let res = await modelProduct.findAll({
      where,
    });
    console.log(res);
    return res;
  } catch (error) {
    console.log(error.message);
    return { msg: error.message };
  }
};
export { getProducts };
