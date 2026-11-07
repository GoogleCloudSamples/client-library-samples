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

// [START recommender_v1_recommender_insighttypeconfig_update]

import (
	"context"
	"fmt"
	"io"

	recommender "cloud.google.com/go/recommender/apiv1"
	"cloud.google.com/go/recommender/apiv1/recommenderpb"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updateInsightTypeConfig updates the display name of an insight type configuration.
func updateInsightTypeConfig(ctx context.Context, w io.Writer, projectID string, locationID string, insightTypeID string) error {
	client, err := recommender.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient: %w", err)
	}
	defer client.Close()

	configName := fmt.Sprintf("projects/%s/locations/%s/insightTypes/%s/config", projectID, locationID, insightTypeID)

	// Retrieve the current configuration to obtain its etag for optimistic concurrency.
	currentConfig, err := client.GetInsightTypeConfig(ctx, &recommenderpb.GetInsightTypeConfigRequest{
		Name: configName,
	})
	if err != nil {
		return fmt.Errorf("GetInsightTypeConfig: %w", err)
	}

	insightTypeConfig := &recommenderpb.InsightTypeConfig{
		Name:        configName,
		DisplayName: "Updated display name",
		Etag:        currentConfig.GetEtag(),
	}
	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"display_name"},
	}

	req := &recommenderpb.UpdateInsightTypeConfigRequest{
		InsightTypeConfig: insightTypeConfig,
		UpdateMask:        updateMask,
	}

	resp, err := client.UpdateInsightTypeConfig(ctx, req)
	if err != nil {
		return fmt.Errorf("UpdateInsightTypeConfig: %w", err)
	}

	fmt.Fprintf(w, "Updated insight type config: %s\n", resp.GetName())

	return nil
}

// [END recommender_v1_recommender_insighttypeconfig_update]
