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

// [START recommender_v1beta1_recommender_insighttypeconfig_get]

import (
	"context"
	"fmt"
	"io"

	recommender "cloud.google.com/go/recommender/apiv1beta1"
	"cloud.google.com/go/recommender/apiv1beta1/recommenderpb"
)

// getInsightTypeConfig retrieves the configuration for a specific insight type.
func getInsightTypeConfig(ctx context.Context, w io.Writer, insightTypeID string, locationID string, projectID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/insightTypes/%s/config", projectID, locationID, insightTypeID)

	client, err := recommender.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &recommenderpb.GetInsightTypeConfigRequest{
		Name: name,
	}

	config, err := client.GetInsightTypeConfig(ctx, req)
	if err != nil {
		return fmt.Errorf("GetInsightTypeConfig failed: %w", err)
	}

	fmt.Fprintf(w, "Retrieved insight type config: %s\n", config.GetName())
	return nil
}

// [END recommender_v1beta1_recommender_insighttypeconfig_get]
