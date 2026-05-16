import { Router } from 'express';
import {
  getLeads,
  getLeadById,
  createLead,
  updateLead,
  deleteLead,
} from '../controllers/leadController';
import {
  createLeadValidator,
  updateLeadValidator,
} from '../validators/leadValidator';
import { authenticate } from '../middleware/authMiddleware';
import { requireRole } from '../middleware/roleMiddleware';

const router = Router();

router.use(authenticate);

router.get('/', getLeads);
router.get('/:id', getLeadById);

router.use(requireRole('admin'));

router.post('/', createLeadValidator, createLead);
router.put('/:id', updateLeadValidator, updateLead);
router.delete('/:id', deleteLead);

export default router;
