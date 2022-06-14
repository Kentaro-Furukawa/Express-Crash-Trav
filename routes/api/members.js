import express from 'express';
const router = express.Router();
import { members } from '../../Members.js';
import { v4 as uuidv4 } from 'uuid';

// Get All Members
router.get('/', (req, res) => {
    res.json(members);
});

// Get Single Member
router.get('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));
    if (found) {
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({ msg: `id ${req.params.id} was not found.` });
    }
});

// Create Member
router.post('/', (req, res) => {
    const newMember = {
        id: uuidv4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }
    if (!newMember.name || !newMember.email) {
        return res.status(400).json({ msg: 'Please enter a name and an email.' })
    }
    members.push(newMember);
    // res.json(members);
    res.redirect('/');
});

// Update Member
router.put('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));
    if (found) {
        const UpdateMember = req.body;
        members.forEach(member => {
            if (member.id === parseInt(req.params.id)) {
                member.name = UpdateMember.name ? UpdateMember.name : member.name;
                member.email = UpdateMember.email ? UpdateMember.email : member.email;

                res.json({ msg: 'Member updated', member })
            }
        })
    } else {
        res.status(400).json({ msg: `id ${req.params.id} was not found.` });
    }
});

// Delete Member
router.delete('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));
    if (found) {
        res.json({ 
            msg: 'Member deleted', 
            members: members.filter(member => member.id !== parseInt(req.params.id)) });
    } else {
        res.status(400).json({ msg: `id ${req.params.id} was not found.` });
    }
});




export default router;