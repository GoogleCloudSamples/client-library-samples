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

// [START recommender_v1_recommender_mark_recommendation_dismissed]

import (
	"context"
	"fmt"
	"io"
	"strings"

	recommender "cloud.google.com/go/recommender/apiv1"
	recommenderpb "cloud.google.com/go/recommender/apiv1/recommenderpb"
)

// markRecommendationDismissed marks a recommendation as dismissed.
func markRecommendationDismissed(ctx context.Context, w io.Writer, projectID string, locationID string, recommenderID string, recommendationID string, etag string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/recommenders/%s/recommendations/%s", projectID, locationID, recommenderID, recommendationID)

	// Recommender API expects etags to be enclosed in double quotes.
	if etag != "" && !strings.HasPrefix(etag, "\"") {
		etag = fmt.Sprintf("%q", etag)
	}

	client, err := recommender.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("recommender.NewClient: %w", err)
	}
	defer client.Close()

	req := &recommenderpb.MarkRecommendationDismissedRequest{
		Name: name,
		Etag: etag,
	}

	resp, err := client.MarkRecommendationDismissed(ctx, req)
	if err != nil {
		return fmt.Errorf("client.MarkRecommendationDismissed: %w", err)
	}

	fmt.Fprintf(w, "Dismissed recommendation: %s\n", resp.GetName())
	return nil
}

// [END recommender_v1_recommender_mark_recommendation_dismissed]
