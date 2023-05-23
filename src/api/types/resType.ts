interface IBaseResponce<D> {
  readonly code: string;
  data?: D;
  message: string;
}

type TGetOrganizationData = {
  num: string;
  organizations: Array<{
    organizationId: number;
    organizationName: string;
  }>;
};

type TGetOrganizationRes = IBaseResponce<TGetOrganizationData>;

type TUserLoginData = {
  userId: number;
  username: string;
  token: string;
  permissionId: number;
  permissionName: string;
};

type TUserLoginRes = IBaseResponce<TUserLoginData>;

export type { IBaseResponce, TGetOrganizationRes, TUserLoginRes };
