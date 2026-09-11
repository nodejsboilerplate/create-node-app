import {
  CodeParadigmType,
  DependencyInjectionType,
  type Settings,
} from "@/settings.service";
import { confirm, select } from "@inquirer/prompts";

export const CodeParadigmSetup = async (settings: Settings) => {
  const get_code_paradigm = await select({
    message: "Select code paradigm:",
    choices: [
      { name: "OOP", value: CodeParadigmType.OOP },
      { name: "FP", value: CodeParadigmType.FP },
    ],
    default: CodeParadigmType.OOP,
  });
  settings.setCodeParadigm(get_code_paradigm);

  const get_dependency_injection_type = await select({
    message: "Select dependency injection approach:",
    choices: [
      { name: "None", value: DependencyInjectionType.None },
      {
        name: "Composition root",
        value: DependencyInjectionType.CompositionRoot,
      },
      { name: "Manual", value: DependencyInjectionType.Manual },
      { name: "tsyringe", value: DependencyInjectionType.Tsyringe },
      { name: "InversifyJS", value: DependencyInjectionType.InversifyJs },
    ],
    default: DependencyInjectionType.None,
  });
  settings.setDependencyInjectionType(get_dependency_injection_type);

  const get_empty_business_logic = await confirm({
    message:
      "Scaffold functions with empty business logic (stubs only, no implementation)?",
    default: false,
  });
  settings.setEmptyBusinessLogic(get_empty_business_logic);
};
