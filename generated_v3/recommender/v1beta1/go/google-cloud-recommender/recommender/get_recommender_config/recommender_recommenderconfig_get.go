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

// [START recommender_v1beta1_recommender_recommenderconfig_get]

import (
	"context"
	"fmt"
	"io"
	"strings"

	recommender "cloud.google.com/go/recommender/apiv1beta1"
	recommenderpb "cloud.google.com/go/recommender/apiv1beta1/recommenderpb"
)

// getRecommenderConfig retrieves configuration details for a specified recommender.
func getRecommenderConfig(ctx context.Context, w io.Writer, locationID string, recommenderID string, projectID string) error {
	// Adjust location to a zone if a regional location is provided for a zonal recommender.
	if strings.Contains(recommenderID, "compute.instance") && strings.Count(locationID, "-") == 1 {
		locationID = locationID + "-a"
	}

	name := fmt.Sprintf("projects/%s/locations/%s/recommenders/%s/config", projectID, locationID, recommenderID)

	client, err := recommender.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &recommenderpb.GetRecommenderConfigRequest{
		Name: name,
	}

	resp, err := client.GetRecommenderConfig(ctx, req)
	if err != nil && strings.Contains(err.Error(), "only allowed in [ZONE] scope") && !strings.HasSuffix(locationID, "-a") {
		req.Name = fmt.Sprintf("projects/%s/locations/%s-a/recommenders/%s/config", projectID, locationID, recommenderID)
		resp, err = client.GetRecommenderConfig(ctx, req)
	}
	if err != nil {
		return fmt.Errorf("GetRecommenderConfig: %w", err)
	}

	fmt.Fprintf(w, "Recommender config: %s\n", resp.GetName())
	return nil
}

// [END recommender_v1beta1_recommender_recommenderconfig_get]
