/* eslint-disable @typescript-eslint/no-explicit-any */
export const isLoggedIn: any = (req: any, res: any, next: any) => {
  if (req.user) {
    next();
  } else {
    next(new Error('unauthorized'));
  }
};

export const isEmployee: any = (req: any, res: any, next: any) => {
  if (req.user) {
    console.log('User is an employee');
    next();
  } else {
    next(new Error('unauthorized'));
  }
};

export const isAdmin: any = (req: any, res: any, next: any) => {
  if (req.user.roleId) {
    next();
  } else {
    next(new Error('unauthorized'));
  }
};
