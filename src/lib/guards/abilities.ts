import { Ability, AbilityBuilder } from "@casl/ability";

type Roles = "admin" | "manager" | "staff";

export default function defineRulesFor(role: Roles) {
  const { can, rules } = new AbilityBuilder(Ability);

  switch (role) {
    case "admin":
      can("manage", "all");
      break;
    case "manager":
      can("show", "Manager");
      can("show", "Staff");
      break;
    case "staff":
      can("show", "Staff");
      break;
    default:
      can("show", "Staff");
      break;
  }

  return rules;
}

export function buildAbilityFor() {
  return new Ability(defineRulesFor("admin"));

  //   https://casl.js.org/v5/en/guide/subject-type-detection
  //   return new Ability(defineRulesFor(role), {
  //     detectSubjectType: (object) => object.constructor
  //   });
}
