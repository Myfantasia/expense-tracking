import {pool} from '../libs/database.js';
import { comparePassword, hashedPassword } from '../libs/index.js';

export const getUser = async (req, res) => {
    try {
        const { userId } =  req.user;

        const userExist = await pool.query({
            text: `SELECT * FROM tbluser WHERE id = $1`,
            values: [userId],
        })

        const user = userExist.rows[0];

        if (!user) {
            return res.status(404)
            .json({ status: 'error', message: 'User not found' });
        }

        user.password = undefined;
        return res.status(201)
        .json({ status: 'success', user });
    } catch (error) {
        console.log(error);
        return res.status(500)
        .json({ status: 'error', message: 'Server Error' });
    }
}

export const changePassword = async (req, res) => {
    try {
        const { userId } =  req.user;

        const { currentPassword, newPassword, confirmPassword } = req.body;

        const userExist = await pool.query({
            text: `SELECT * FROM tbluser WHERE id = $1`,
            values: [userId],
        })

        const user = userExist.rows[0];

        if (!user) {
            return res.status(404)
            .json({ status: 'error', message: 'User not found' });
        }

        if (newPassword !== confirmPassword) {
            return res.status(400)
            .json({ status: 'error', 
            message: 'New password and confirm password do not match' });
        }

        const isMatch = await comparePassword(currentPassword, user?.password);

        if (!isMatch) {
            return res.status(400)
            .json({ status: 'error', message: 'Current password is incorrect' });
        }

        const hashedPwd = await hashedPassword(newPassword);

        await pool.query({
            text: `UPDATE tbluser SET password = $1 WHERE id = $2`,
            values: [hashedPwd, userId],
        })

        return res.status(200)
        .json({ status: 'success', 
        message: 'Password changed successfully' });
    } catch (error) {
        console.log(error);
        return res.status(500)
        .json({ status: 'error', message: 'Server Error' });
    }
}

export const updateUser = async (req, res) => {
    try {
        const { userId } =  req.user;
        const { firstname, lastname, country, currency, contact } = req.body;

        const userExist = await pool.query({
            text: `SELECT * FROM tbluser WHERE id = $1`,
            values: [userId],
        })

        const user = userExist.rows[0];

        if (!user) {
            return res.status(404)
            .json({ status: 'error', message: 'User not found' });
        }

        const updatedUser = await pool.query({
            text: `UPDATE tbluser SET firstname = $1, lastname = $2, country = $3, 
            currency = $4, contact = $5, updatedat = CURRENT_TIMESTAMP WHERE id = $6 RETURNING *`,
            values: [firstname, lastname, country, currency, contact, userId],
        })

         updatedUser.rows[0].password = undefined;

        return res.status(200).json({ status: 'success', 
        message: 'User updated successfully', 
        user: updatedUser.rows[0] });
    } catch (error) {
        console.log(error);
        return res.status(500)
        .json({ status: 'error', message: 'Server Error' });
    }
}