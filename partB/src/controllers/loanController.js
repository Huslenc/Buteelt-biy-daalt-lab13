const loanService = require('../services/loanService');

function getLoans(req, res, next) {
  try {
    const loans = loanService.getAllLoans(req.query);
    res.json({ data: loans, message: 'success' });
  } catch (err) { next(err); }
}

function getLoan(req, res, next) {
  try {
    const loan = loanService.getLoanById(Number(req.params.id));
    if (!loan) return res.status(404).json({ error: 'Loan not found', code: 404 });
    res.json({ data: loan, message: 'success' });
  } catch (err) { next(err); }
}

function getOverdueLoans(req, res, next) {
  try {
    const loans = loanService.getOverdueLoans();
    res.json({ data: loans, message: 'success' });
  } catch (err) { next(err); }
}

function createLoan(req, res, next) {
  try {
    const loan = loanService.createLoan(req.body);
    res.status(201).json({ data: loan, message: 'Loan created' });
  } catch (err) {
    if (err.status) return res.status(err.status).json({ error: err.message, code: err.status });
    next(err);
  }
}

function returnLoan(req, res, next) {
  try {
    const loan = loanService.returnLoan(Number(req.params.id));
    res.json({ data: loan, message: 'Book returned successfully' });
  } catch (err) {
    if (err.status) return res.status(err.status).json({ error: err.message, code: err.status });
    next(err);
  }
}

module.exports = { getLoans, getLoan, getOverdueLoans, createLoan, returnLoan };
