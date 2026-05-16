import { Request, Response } from 'express';
import { Lead } from '../models/Lead';
import { ApiError } from '../utils/ApiError';
import { ApiResponse } from '../utils/ApiResponse';
import { asyncHandler } from '../utils/asyncHandler';

export const getLeads = asyncHandler(async (req: Request, res: Response) => {
  const { status, source, search, sort, page = '1', limit = '10' } = req.query;

  const query: any = {};

  if (status && status !== 'All') {
    query.status = status;
  }

  if (source && source !== 'All') {
    query.source = source;
  }

  if (search) {
    // regex flags: i = case insensitive
    query.$or = [
      { name: { $regex: search as string, $options: 'i' } },
      { email: { $regex: search as string, $options: 'i' } }
    ];
  }

  const sortOption = sort === 'oldest' ? { createdAt: 1 } : { createdAt: -1 };

  // bypass pagination for CSV export
  if (limit === 'all') {
    let leads = await Lead.find(query).sort(sortOption as any);
    return res.status(200).json(new ApiResponse(leads));
  }

  let p = parseInt(page as string, 10);
  let l = parseInt(limit as string, 10);
  let startIndex = (p - 1) * l;

  const [leads, total] = await Promise.all([
    Lead.find(query)
      .sort(sortOption as any)
      .skip(startIndex)
      .limit(l),
    Lead.countDocuments(query),
  ]);

  res.status(200).json({
    success: true,
    data: leads,
    pagination: {
      total,
      page: p,
      limit: l,
      totalPages: Math.ceil(total / l)
    }
  });
});

export const getLeadById = asyncHandler(async (req: Request, res: Response) => {
  const lead = await Lead.findById(req.params.id);
  if (!lead) {
    throw new ApiError(404, 'Lead not found');
  }
  res.status(200).json(new ApiResponse(lead));
});

export const createLead = asyncHandler(async (req: Request, res: Response) => {
  const lead = await Lead.create(req.body);
  res.status(201).json(new ApiResponse(lead, 'Lead created successfully'));
});

export const updateLead = asyncHandler(async (req: Request, res: Response) => {
  const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!lead) {
    throw new ApiError(404, 'Lead not found');
  }

  res.status(200).json(new ApiResponse(lead, 'Lead updated successfully'));
});

export const deleteLead = asyncHandler(async (req: Request, res: Response) => {
  const lead = await Lead.findByIdAndDelete(req.params.id);

  if (!lead) {
    throw new ApiError(404, 'Lead not found');
  }

  res.status(200).json(new ApiResponse(null, 'Lead deleted successfully'));
});
