// Copyright 2026 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package main

// [START datamigration_v1_datamigrationservice_mappingrule_create]

import (
	"context"
	"fmt"
	"io"

	datamigration "cloud.google.com/go/clouddms/apiv1"
	clouddmspb "cloud.google.com/go/clouddms/apiv1/clouddmspb"
)

// createMappingRule creates a mapping rule in a conversion workspace.
func createMappingRule(ctx context.Context, w io.Writer, mappingRuleID string, projectID string, locationID string, conversionWorkspaceID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s/conversionWorkspaces/%s", projectID, locationID, conversionWorkspaceID)
	mappingRule := &clouddmspb.MappingRule{
		DisplayName: "Example Schema Rename Rule",
		State:       clouddmspb.MappingRule_ENABLED,
		RuleScope:   clouddmspb.DatabaseEntityType_DATABASE_ENTITY_TYPE_SCHEMA,
		RuleOrder:   1,
		Filter: &clouddmspb.MappingRuleFilter{
			Entities: []string{"example_source_schema"},
		},
		Details: &clouddmspb.MappingRule_SingleEntityRename{
			SingleEntityRename: &clouddmspb.SingleEntityRename{
				NewName: "example_target_schema",
			},
		},
	}

	client, err := datamigration.NewDataMigrationClient(ctx)
	if err != nil {
		return fmt.Errorf("NewDataMigrationClient failed: %w", err)
	}
	defer client.Close()

	req := &clouddmspb.CreateMappingRuleRequest{
		Parent:        parent,
		MappingRuleId: mappingRuleID,
		MappingRule:   mappingRule,
	}

	response, err := client.CreateMappingRule(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateMappingRule failed: %w", err)
	}

	fmt.Fprintf(w, "Created mapping rule: %s\n", response.GetName())
	return nil
}

// [END datamigration_v1_datamigrationservice_mappingrule_create]
