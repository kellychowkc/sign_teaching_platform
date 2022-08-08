
import { Request, Response, NextFunction } from 'express';
import path from 'path';

export function isLoggedInAll(req:Request, res:Response, next: NextFunction) {
    if (req.session["user"]) {
        next();
    } else {
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    }
}

export function isLoggedInStudent(req: Request, res: Response, next: NextFunction) {
    if (req.session['user'].identity === 'student') {
        next();
    } else {
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    }
}


export function isLoggedInTeacher(req: Request, res: Response, next: NextFunction) {
    if (req.session['user'].identity === 'teacher') {
        next();
    } else {
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    }
}


export function isLoggedInAdmin(req: Request, res: Response, next: NextFunction) {
    if (req.session['user'].identity === 'admin') {
        next();
    } else {
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    }
}