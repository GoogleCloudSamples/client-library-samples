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

// [START infra-manager_v1_config_automigrationconfig_update]

import (
	"context"
	"fmt"
	"io"

	config "cloud.google.com/go/config/apiv1"
	"cloud.google.com/go/config/apiv1/configpb"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updateAutoMigrationConfig updates the auto migration configuration for a location.
func updateAutoMigrationConfig(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/autoMigrationConfig", projectID, locationID)
	autoMigrationConfig := &configpb.AutoMigrationConfig{
		Name:                 name,
		AutoMigrationEnabled: true,
	}
	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"auto_migration_enabled"},
	}

	client, err := config.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &configpb.UpdateAutoMigrationConfigRequest{
		AutoMigrationConfig: autoMigrationConfig,
		UpdateMask:          updateMask,
	}

	op, err := client.UpdateAutoMigrationConfig(ctx, req)
	if err != nil {
		return fmt.Errorf("UpdateAutoMigrationConfig failed: %w", err)
	}

	response, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Updated auto migration config: %s\n", response.GetName())
	return nil
}

// [END infra-manager_v1_config_automigrationconfig_update]
