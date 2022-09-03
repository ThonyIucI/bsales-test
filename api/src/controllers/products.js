import { Op } from 'sequelize';
import { modelProduct } from '../models/index.js';

const getProducts = async (req, res) => {
  const { name } = req.query;
  let response;
  console.log(name, Op.iLike);
  try {
    if (name) {
      response = await getProductByName(name);
      response
        ? res.status(200).json(response)
        : res
            .status(404)
            .send(`Any match with "${name}", please try with a different word`);
    } else {
      response = await modelProduct.findAll();
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(500).send({ msg: 'Could not find any products', error });
  }
};
const getProductByName = async (name) => {
  try {
    let res = await modelProduct.findAll({
      where: { name: { [Op.substring]: `${name}` } }, //Buscar nombres sin importar mayusculas o minúsculas
    });

    return res;
  } catch (error) {
    console.log(error.message);
  }
};
export { getProducts };
