import {UsersLeaveDTO} from "./users-leave-dto.model";

export class UserDataInCalendarDTO {
  name: string="";
  email: string="";
  usersLeaves: UsersLeaveDTO[]=[];
}
