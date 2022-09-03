import { modelCategory } from '../models/index.js';

const getCategories = async (req, res) => {
  try {
    const response = await modelCategory.findAll();

    res.status(200).json(response);
  } catch (error) {
    res.status(500).send({ msg: 'Could not find any category', error });
  }
};

export { getCategories };
