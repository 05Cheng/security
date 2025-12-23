export function role(required) {
    return (req, res, next) => {
      if (req.user.role !== required) {
        return res.status(403).json({ message: "Forbidden" });
      }
      next();
    };
  }
  