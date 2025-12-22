import { userRelationshipEntity } from "src/module/user/domaine/entities/user-relationship";


export class RelationMapper{
  static relationShipEntityToDocument(entity: userRelationshipEntity) {
    return {
      follower: entity.getFllower(),
      following: entity.getFllowing(),
    };

  }

  static DocumentToRelationshipEntity(
      document: any,
    ): userRelationshipEntity {
      const relation = new userRelationshipEntity(
        document._id.toString(),
        document.follower.toString(),
        document.following.toString(),
      );

      relation.createAt = document.createdAt;
      relation.updateAt = document.updatedAt;
      return relation;
    }
}

