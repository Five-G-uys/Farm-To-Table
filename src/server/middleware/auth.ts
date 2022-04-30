export const isLoggedIn: any = (req: any, res: any, next: any) => {
  if(req.user) {
    next();
  } else {
    next(new Error('unauthorized'));
  }
}



