import { Ability, AbilityBuilder } from "@casl/ability";

export default function defineRulesFor() {
  const { can, rules } = new AbilityBuilder(Ability);

  // switch (user?.user?.email) {
  //   case "admin":
  //     can("manage", "all");
  //     break;
  //   case "manager":
  //     can("show", "Manager");
  //     can("show", "Staff");
  //     break;
  //   case "staff":
  //     can("show", "Staff");
  //     break;
  //   default:
  //     can("show", "Staff");
  //     break;
  // }

  can("show", "Staff");

  return rules;
}

export function buildAbilityFor() {
  return new Ability(defineRulesFor());

  //   https://casl.js.org/v5/en/guide/subject-type-detection
  //   return new Ability(defineRulesFor(role), {
  //     detectSubjectType: (object) => object.constructor
  //   });
}
