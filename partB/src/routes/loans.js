const express = require('express');
const router = express.Router();
const loanController = require('../controllers/loanController');
const { validateLoan } = require('../middleware/validate');

router.get('/',              loanController.getLoans);
router.get('/overdue',       loanController.getOverdueLoans);
router.get('/:id',           loanController.getLoan);
router.post('/',             validateLoan, loanController.createLoan);
router.put('/:id/return',    loanController.returnLoan);

module.exports = router;
