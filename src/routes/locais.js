const express = require('express');
const router = express.Router();
const locaisController = require('../controllers/locaisController');

router.get('/', locaisController.getLocais);
router.post('/', locaisController.createLocal);
router.put('/:id', locaisController.updateLocal);
router.delete('/:id', locaisController.deleteLocal);
router.get('/:id', locaisController.getLocalById);

module.exports = router;