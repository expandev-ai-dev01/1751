import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { vehicleList, getFilterOptions, getModelosByMarcas } from '@/services/vehicle';
import { successResponse, createError } from '@/middleware';
import { HTTP_STATUS } from '@/constants';

/**
 * @api {get} /api/v1/external/vehicle List Vehicles
 * @apiName ListVehicles
 * @apiGroup Vehicle
 * @apiVersion 1.0.0
 *
 * @apiDescription Retrieves a paginated list of vehicles with optional filtering and sorting
 *
 * @apiParam {String[]} [marcas] Filter by brands (comma-separated)
 * @apiParam {String[]} [modelos] Filter by models (comma-separated)
 * @apiParam {Number} [anoMin] Minimum year filter
 * @apiParam {Number} [anoMax] Maximum year filter
 * @apiParam {Number} [precoMin] Minimum price filter
 * @apiParam {Number} [precoMax] Maximum price filter
 * @apiParam {String[]} [cambios] Filter by transmission types (comma-separated)
 * @apiParam {String} [ordenacao] Sort criteria
 * @apiParam {Number} [pagina=1] Page number
 * @apiParam {Number} [itensPorPagina=12] Items per page
 *
 * @apiSuccess {Object[]} veiculos Array of vehicles
 * @apiSuccess {Number} total Total number of vehicles
 * @apiSuccess {Number} pagina Current page
 * @apiSuccess {Number} itensPorPagina Items per page
 * @apiSuccess {Number} totalPaginas Total pages
 *
 * @apiError {String} ValidationError Invalid query parameters
 * @apiError {String} ServerError Internal server error
 */
const querySchema = z.object({
  marcas: z
    .string()
    .optional()
    .transform((val) => (val ? val.split(',') : undefined)),
  modelos: z
    .string()
    .optional()
    .transform((val) => (val ? val.split(',') : undefined)),
  anoMin: z.coerce.number().int().min(1900).optional(),
  anoMax: z.coerce.number().int().min(1900).optional(),
  precoMin: z.coerce.number().min(0).optional(),
  precoMax: z.coerce.number().min(0).optional(),
  cambios: z
    .string()
    .optional()
    .transform((val) => (val ? val.split(',') : undefined)),
  ordenacao: z.string().optional(),
  pagina: z.coerce.number().int().min(1).optional(),
  itensPorPagina: z.coerce.number().int().min(1).max(100).optional(),
});

export async function listHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    /**
     * @validation Validate query parameters
     * @throw {ValidationError}
     */
    const validatedQuery = querySchema.parse(req.query);

    /**
     * @validation Validate year range consistency
     * @throw {ValidationError}
     */
    if (
      validatedQuery.anoMin !== undefined &&
      validatedQuery.anoMax !== undefined &&
      validatedQuery.anoMin > validatedQuery.anoMax
    ) {
      throw createError(
        'anoMinCannotBeGreaterThanAnoMax',
        HTTP_STATUS.BAD_REQUEST,
        'INVALID_YEAR_RANGE'
      );
    }

    /**
     * @validation Validate price range consistency
     * @throw {ValidationError}
     */
    if (
      validatedQuery.precoMin !== undefined &&
      validatedQuery.precoMax !== undefined &&
      validatedQuery.precoMin > validatedQuery.precoMax
    ) {
      throw createError(
        'precoMinCannotBeGreaterThanPrecoMax',
        HTTP_STATUS.BAD_REQUEST,
        'INVALID_PRICE_RANGE'
      );
    }

    /**
     * @rule {fn-vehicle-list} Retrieve filtered and paginated vehicle list
     */
    const data = await vehicleList(validatedQuery);

    res.json(
      successResponse(data, {
        page: data.pagina,
        pageSize: data.itensPorPagina,
        total: data.total,
      })
    );
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return next(
        createError('validationFailed', HTTP_STATUS.BAD_REQUEST, 'VALIDATION_ERROR', error.errors)
      );
    }
    next(error);
  }
}

/**
 * @api {get} /api/v1/external/vehicle/filter-options Get Filter Options
 * @apiName GetFilterOptions
 * @apiGroup Vehicle
 * @apiVersion 1.0.0
 *
 * @apiDescription Retrieves available filter options based on current catalog
 *
 * @apiSuccess {String[]} marcas Available brands
 * @apiSuccess {String[]} modelos Available models
 * @apiSuccess {Number[]} anos Available years
 * @apiSuccess {String[]} cambios Available transmission types
 *
 * @apiError {String} ServerError Internal server error
 */
export async function filterOptionsHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    /**
     * @rule {fn-filter-options} Retrieve available filter options
     */
    const data = await getFilterOptions();

    res.json(successResponse(data));
  } catch (error: any) {
    next(error);
  }
}

/**
 * @api {get} /api/v1/external/vehicle/modelos-by-marcas Get Models by Brands
 * @apiName GetModelosByMarcas
 * @apiGroup Vehicle
 * @apiVersion 1.0.0
 *
 * @apiDescription Retrieves available models filtered by selected brands
 *
 * @apiParam {String[]} marcas Selected brands (comma-separated)
 *
 * @apiSuccess {String[]} modelos Available models for selected brands
 *
 * @apiError {String} ValidationError Invalid query parameters
 * @apiError {String} ServerError Internal server error
 */
const modelosQuerySchema = z.object({
  marcas: z
    .string()
    .optional()
    .transform((val) => (val ? val.split(',') : [])),
});

export async function modelosByMarcasHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    /**
     * @validation Validate query parameters
     * @throw {ValidationError}
     */
    const validatedQuery = modelosQuerySchema.parse(req.query);

    /**
     * @rule {fn-modelos-by-marcas} Retrieve models filtered by brands
     */
    const modelos = await getModelosByMarcas(validatedQuery.marcas);

    res.json(successResponse(modelos));
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return next(
        createError('validationFailed', HTTP_STATUS.BAD_REQUEST, 'VALIDATION_ERROR', error.errors)
      );
    }
    next(error);
  }
}
