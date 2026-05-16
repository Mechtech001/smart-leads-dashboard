import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { ApiError } from '../utils/ApiError';
import { ApiResponse } from '../utils/ApiResponse';
import { asyncHandler } from '../utils/asyncHandler';
import { env } from '../config/env';
import { Role } from '../types/index';

function generateToken(id: string, role: Role) {
  return jwt.sign({ id, role }, env.JWT_SECRET, { expiresIn: '7d' });
}

export const register = asyncHandler(async (req: Request, res: Response) => {
  // console.log(req.body);
  const { name, email, password, role } = req.body;

  let existing = await User.findOne({ email });
  if (existing) throw new ApiError(400, 'User with this email already exists');

  const user = await User.create({
    name,
    email,
    password,
    role: role || 'sales',
  });

  const token = generateToken(user.id, user.role);

  res.status(201).json(
    new ApiResponse(
      {
        user: { id: user.id, name: user.name, email: user.email, role: user.role },
        token,
      },
      'User registered successfully'
    )
  );
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(401, 'Invalid email or password');
  }

  let isMatch = await user.comparePassword(password);
  if (!isMatch) throw new ApiError(401, 'Invalid email or password');

  const token = generateToken(user.id, user.role);

  res.status(200).json(
    new ApiResponse(
      {
        user: { id: user.id, name: user.name, email: user.email, role: user.role },
        token,
      },
      'Logged in successfully'
    )
  );
});
