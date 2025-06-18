import { Request, Response, NextFunction } from "express";

export const validateNumericId = (req: Request, res: Response, next: NextFunction): void => {
  const { id } = req.params;

  if (!/^\d+$/.test(id)) {
    res.status(400).json({ error: "ID skal være et numerisk heltal" });
    return;
  }
  next();
};
