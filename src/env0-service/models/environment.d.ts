type User = {
  email?: string;
  user_id?: string;
  created_at?: string;
  picture?: string;
  name?: string;
  last_login?: string;
  given_name?: string;
  family_name?: string;
};

type DeploymentType =
  | 'deploy'
  | 'destroy'
  | 'prPlan'
  | 'driftDetection'
  | 'task'
  | 'remotePlan'
  | 'dryRun'
  | 'moduleTest';

type Output = Record<string, { value: any; sensitive: boolean; type: string }>;
type TerragruntRunAllOutput = { moduleName: string; output: Output }[];
type DeploymentOutput = Output | TerragruntRunAllOutput;

namespace Infracost {
  type Output = {
    resources: any[];
    totalHourlyCost: string;
    totalMonthlyCost: string;
  };

  type Project = {
    path: string;
    metadata: any;
    pastBreakdown: Infracost.Output;
    breakdown: Infracost.Output;
    diff: Infracost.Output;
  };

  type CostEstimationProject = {
    diff: {
      totalMonthlyCost: string;
    };
  };

  type TotalOutput = Output & {
    version: string;
    projects: Project[];
    timeGenerated: string;
    summary: {
      unsupportedResourceCounts: any;
    };
  };

  type CostEstimation = {
    totalMonthlyCost: number;
    monthlyCostDiff: number;
    projects: Infracost.CostEstimationProject[];
  };
}

namespace EnvironmentApi {
  type Reviewer = { userId: string; action: 'approved' | 'cancelled' };
  type ReviewerUser = { user: User; action: 'approved' | 'cancelled' };
  type VcsProvider =
    | 'gitlab'
    | 'github'
    | 'bitbucket'
    | 'bitbucketServer'
    | 'gitlabEnterprise'
    | 'githubEnterprise'
    | 'azureDevOps';

  type QueryBoolean = 'true' | 'false';
  type Revision = string;
  type TTLType = 'INFINITE' | 'HOURS' | 'DATE';
  type DeploymentType =
    | 'deploy'
    | 'destroy'
    | 'prPlan'
    | 'driftDetection'
    | 'task'
    | 'remotePlan'
    | 'dryRun'
    | 'moduleTest';
  type DeploymentLogStatus =
    | 'PENDING'
    | 'IN_PROGRESS'
    | 'SUCCESS'
    | 'FAILED'
    | 'CANCELLED'
    | 'TIMEOUT';

  type Output = Record<string, any>;
  type TerragruntRunAllOutput = { moduleName: string; output: Output }[];
  type DeploymentOutput = Output | TerragruntRunAllOutput;
}

namespace BlueprintApi {
  type DeployableType =
    | 'terraform'
    | 'opentofu'
    | 'terragrunt'
    | 'pulumi'
    | 'cloudformation'
    | 'arm'
    | 'bicep';
  type BlueprintType =
    | 'terraform'
    | 'opentofu'
    | 'terragrunt'
    | 'pulumi'
    | 'cloudformation'
    | 'arm'
    | 'bicep';
}

namespace DeploymentApi {
  namespace Plan {
    type Plan = any;
    type PlanSummary = any;
  }
  type Request = any;
}

namespace WorkflowEnvironments {
  type WorkflowState = { environments: Record<string, WorkflowSubEnvironment> };
  type WorkflowFile = WorkflowState & { settings: any };
  type WorkflowSubEnvironment = {
    environmentId?: string;
    toDestroy?: boolean;
    isRemoteBackend?: boolean;
    k8sNamespace?: string;
  };
}

type WorkflowDeploymentOptions = {
  node: string;
  operation: 'run-from-here' | 'single-node-deploy' | 'single-node-destroy';
};

interface EnvironmentResource {
  provider: string;
  type: string;
  name: string;
  moduleName?: string;
}

type Variables = any[];

type GitMetadata = {
  commit: string;
  branch: string;
  timestamp: Date;
};

type ProviderVersions =
  | {
      [provider: string]: string;
    }
  | {
      [tgModule: string]: {
        [tfProvider: string]: string;
      };
    };

type ModuleVersions =
  | {
      [module: string]: string;
    }
  | {
      [tgModule: string]: {
        [tfModule: string]: string;
      };
    };

type StateFileHash =
  | {
      value: string;
    }
  | {
      [module: string]: string;
    };

namespace DriftCause {
  type CompassScanStatus = 'CAN_RUN' | 'FAILING' | 'RUNNING' | 'NO_SCAN_NEEDED' | 'NOT_CONFIGURED';

  interface UnmanagedChange {
    resourceId: string;
    resourceType: string;
    resourcePath: string;
    canGetEventsForProvider: boolean;
  }

  interface UnappliedCommit {
    userEmail: string;
    timestamp: Date;
    commitHash: string;
  }

  type VersionChange =
    | {
        type: 'terraform' | 'opentofu';
        appliedVersion: string;
        detectedVersion: string;
        name: string;
      }
    | {
        type: 'terragrunt';
        tgModuleName: string;
        appliedVersion: string;
        detectedVersion: string;
        name: string;
      };

  type VariableChange = {
    variableName: string;
    isSensitive: boolean;
    applyVariable: any;
    driftVariable?: any;
  };

  type StateModifyingDeployment = {
    timestamp: Date;
    deploymentId: string;
    userId: string;
    user?: User;
    type: 'remote-apply' | 'task' | 'apply-by-comment';
  };

  type SupportedIacTypes = Extract<
    BlueprintApi.BlueprintType,
    'opentofu' | 'terraform' | 'terragrunt'
  >;
}

type AutoDestroyStatus = 'ENABLED' | 'DISABLED';

type EnvironmentNextScheduledDates = {
  deploy?: Date;
  destroy?: Date;
};

interface EnvironmentLockStatus {
  reason?: string;
  updatedBy: string;
  updatedByUser?: User;
  updatedAt: Date;
}

type DriftStatus = 'DRIFTED' | 'NOT_DRIFTED' | 'UNKNOWN';

type TriggerName = string;

type DeploymentLogStatus = EnvironmentApi.DeploymentLogStatus;

type CustomEnv0EnvironmentVariables = {
  environmentId?: string;
  projectId?: string;
  projectName?: string;
  deploymentLogId?: string;
  deploymentType?: 'deploy' | 'destroy' | 'prPlan';
  deploymentRevision?: string;
  workspaceName?: string;
  rootDir?: string;
  organizationId?: string;
  templateId?: string;
  templateDir?: string;
  templateName?: string;
  environmentName?: string;
  environmentCreatorName?: string;
  environmentCreatorUserId?: string;
  environmentCreatorEmail?: string;
  deployerName?: string;
  deployerUserId?: string;
  deployerEmail?: string;
  reviewerName?: string;
  reviewerEmail?: string;
  reviewerUserId?: string;
  vcsProvider?: EnvironmentApi.VcsProvider;
  prAuthor?: string;
  prNumber?: string;
  prSourceRepository?: string;
  prSourceBranch?: string;
  prTargetBranch?: string;
  commitHash?: string;
  commitUrl?: string;
  oidcToken?: string;
  vcsAccessToken?: string;
  tfPlanJson?: string;
  cliArgsPlan?: string;
  cliArgsApply?: string;
};

type DeploymentLog = {
  type: DeploymentType;
  startedBy: string;
  queuedAt: Date;
  startedAt: Date;
  finishedAt: Date;
  output: DeploymentOutput;
  error: Record<string, any>;
  failedCommand?: string;
  customEnv0EnvironmentVariables?: CustomEnv0EnvironmentVariables;
  costEstimation: Infracost.CostEstimation;
  status: DeploymentLogStatus;
  blueprintId: string;
  blueprintName: string;
  blueprintRepository: string;
  blueprintRevision: string;
  blueprintPath: string;
  blueprintType: BlueprintApi.DeployableType;
  comment?: string;
  environmentId: string;
  resourceCount: number;
  resources?: EnvironmentResource[];
  startedByUser: User;
  isScheduledRun: boolean;
  abortedBy: string;
  abortedByUser: User;
  gitUser?: string;
  gitAvatarUrl?: string;
  prNumber?: string;
  triggerName?: TriggerName;
  driftDetected?: boolean;
  plan?: DeploymentApi.Plan.Plan;
  planSummary?: DeploymentApi.Plan.PlanSummary;
  isSkippedApply?: boolean;
  workflowDeploymentId?: string;
  workflowFile?: WorkflowEnvironments.WorkflowFile;
  workflowDeploymentOptions?: WorkflowDeploymentOptions;
  stateVersionId?: string;
  reviewersUsers: EnvironmentApi.ReviewerUser[];
  reviewers: EnvironmentApi.Reviewer[];
  reviewedBy?: string;
  reviewedByUser?: User;
  targets?: string[];
  variables?: Variables;
  gitMetadata?: GitMetadata;
  providerVersions?: ProviderVersions;
  moduleVersions?: ModuleVersions;
  stateFileHash?: StateFileHash;
  driftCause?: {
    unappliedCommits: DriftCause.UnappliedCommit[];
  };
};

type EnvironmentStatus =
  | 'CREATED'
  | 'INACTIVE'
  | 'ACTIVE'
  | 'FAILED'
  | 'TIMEOUT'
  | 'WAITING_FOR_USER'
  | 'DEPLOY_IN_PROGRESS'
  | 'DESTROY_IN_PROGRESS'
  | 'TASK_IN_PROGRESS'
  | 'ABORTING'
  | 'ABORTED'
  | 'NEVER_DEPLOYED'
  | 'DRIFTED'
  | 'DRY_RUN_IN_PROGRESS';

export interface Environment {
  id: string;
  name: string;
  organizationId: string;
  projectId: string;
  userId: string;
  workspaceName: string;
  user: User;
  requiresApproval: boolean;
  status: EnvironmentStatus;
  latestDeploymentLogId: string;
  latestDeploymentLog: DeploymentLog;
  lifespanEndAt: Date;
  markedForAutoDestroy: AutoDestroyStatus;
  isArchived: boolean;
  nextScheduledDates: EnvironmentNextScheduledDates;
  vcsCommandsAlias?: string;
  vcsPrCommentsEnabled?: boolean;
  continuousDeployment: boolean;
  pullRequestPlanDeployments: boolean;
  autoDeployOnPathChangesOnly: boolean;
  autoDeployByCustomGlob?: string;
  terragruntWorkingDirectory?: string;
  isSingleUseBlueprint?: boolean;
  workflowEnvironmentId?: string;
  isRemoteBackend: boolean;
  isLocked: boolean;
  lockStatus?: EnvironmentLockStatus;
  k8sNamespace?: string;
  isRemoteApplyEnabled?: boolean;
  driftStatus: DriftStatus;
}
