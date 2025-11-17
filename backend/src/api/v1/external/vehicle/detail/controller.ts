import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { vehicleGetDetail } from '@/services/vehicle';
import { successResponse, createError } from '@/middleware';
import { HTTP_STATUS } from '@/constants';

/**
 * @api {get} /api/v1/external/vehicle/:id Get Vehicle Details
 * @apiName GetVehicleDetails
 * @apiGroup Vehicle
 * @apiVersion 1.0.0
 *
 * @apiDescription Retrieves detailed information about a specific vehicle
 *
 * @apiParam {String} id Vehicle identifier
 *
 * @apiSuccess {Object} vehicle Complete vehicle information
 * @apiSuccess {String} vehicle.id Vehicle identifier
 * @apiSuccess {String} vehicle.tituloAnuncio Advertisement title
 * @apiSuccess {Number} vehicle.preco Vehicle price
 * @apiSuccess {String} vehicle.statusVeiculo Vehicle status
 * @apiSuccess {Object[]} vehicle.fotos Photo gallery
 * @apiSuccess {Object} vehicle.especificacoes Technical specifications
 * @apiSuccess {Object[]} vehicle.itensSerie Standard items
 * @apiSuccess {Object[]} vehicle.opcionais Optional items
 * @apiSuccess {Object} vehicle.historico Vehicle history
 * @apiSuccess {Object} vehicle.condicoesVenda Sale conditions
 * @apiSuccess {String} vehicle.urlCompartilhamento Sharing URL
 * @apiSuccess {Object[]} vehicle.veiculosSimilares Similar vehicles
 *
 * @apiError {String} NotFoundError Vehicle not found
 * @apiError {String} ValidationError Invalid vehicle ID
 * @apiError {String} ServerError Internal server error
 */
const paramsSchema = z.object({
  id: z.string().min(1),
});

export async function getHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    /**
     * @validation Validate vehicle ID parameter
     * @throw {ValidationError}
     */
    const validatedParams = paramsSchema.parse(req.params);

    /**
     * @rule {fn-vehicle-detail} Retrieve complete vehicle details
     */
    const data = await vehicleGetDetail(validatedParams.id);

    /**
     * @validation Verify vehicle exists
     * @throw {NotFoundError}
     */
    if (!data) {
      throw createError('vehicleNotFound', HTTP_STATUS.NOT_FOUND, 'VEHICLE_NOT_FOUND');
    }

    res.json(successResponse(data));
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return next(
        createError('validationFailed', HTTP_STATUS.BAD_REQUEST, 'VALIDATION_ERROR', error.errors)
      );
    }
    next(error);
  }
}
