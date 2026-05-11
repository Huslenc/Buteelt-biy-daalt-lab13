const memberService = require('../services/memberService');

function getMembers(req, res, next) {
  try {
    const members = memberService.getAllMembers(req.query);
    res.json({ data: members, message: 'success' });
  } catch (err) { next(err); }
}

function getMember(req, res, next) {
  try {
    const member = memberService.getMemberById(Number(req.params.id));
    if (!member) return res.status(404).json({ error: 'Member not found', code: 404 });
    res.json({ data: member, message: 'success' });
  } catch (err) { next(err); }
}

function createMember(req, res, next) {
  try {
    const member = memberService.createMember(req.body);
    res.status(201).json({ data: member, message: 'Member created' });
  } catch (err) {
    if (err.message && err.message.includes('UNIQUE')) {
      return res.status(409).json({ error: 'Email already exists', code: 409 });
    }
    next(err);
  }
}

function updateMember(req, res, next) {
  try {
    const member = memberService.updateMember(Number(req.params.id), req.body);
    if (!member) return res.status(404).json({ error: 'Member not found', code: 404 });
    res.json({ data: member, message: 'Member updated' });
  } catch (err) { next(err); }
}

function deleteMember(req, res, next) {
  try {
    const member = memberService.deleteMember(Number(req.params.id));
    if (!member) return res.status(404).json({ error: 'Member not found', code: 404 });
    res.status(204).send();
  } catch (err) { next(err); }
}

module.exports = { getMembers, getMember, createMember, updateMember, deleteMember };
