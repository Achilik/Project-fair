const express = require('express');
const Proposal = require('../models/Proposal');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated, ensureUserIsManagement } = require('../config/auth');

// Welcome Page

router.get('/:managementName', ensureAuthenticated, ensureUserIsManagement, async (req, res) => {
    const proposals = await Proposal.find().sort({ createdAt: 'desc' });
    res.render('management/managementHomePage.ejs', { pageTitle: `Management Panel | Project Fair`, managementName: req.user.userName, proposals });
});


router.get('/proposals/:slug', ensureAuthenticated, ensureUserIsManagement, async (req, res) => {
    const proposal = await Proposal.findOne({ slug: req.params.slug });

    if (proposal == null) res.redirect('back');
    res.render('management/showProject', { pageTitle: `Project Fair | ${proposal.projectTitle}`, proposal, managementName: req.user.userName });
});

// Proposal or project accepting route

router.get('/proposal-accept/:studentId', ensureAuthenticated, ensureUserIsManagement, async (req, res) => {

    try {
        const proposal = await Proposal.findOneAndUpdate({ studentId: req.params.studentId }, { $set: { isApproved: 'Accepted' } });

        if (proposal == null) res.redirect('back');

        res.redirect(`/management/${req.user.userName}`);
    } catch (error) {
        console.log(error);
    }

});

// Proposal or project rejecting route

router.get('/proposal-reject/:studentId', ensureAuthenticated, ensureUserIsManagement, async (req, res) => {

    try {
        const proposal = await Proposal.findOneAndUpdate({ studentId: req.params.studentId }, { $set: { isApproved: 'Rejected' } });

        if (proposal == null) res.redirect('back');

        res.redirect(`/management/${req.user.userName}`);

    } catch (error) {
        console.log(error);
    }

});



module.exports = router;