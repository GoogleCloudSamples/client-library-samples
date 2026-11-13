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

// [START discoveryengine_v1alpha_rankservice_rank]

import (
	"context"
	"fmt"
	"io"

	discoveryengine "cloud.google.com/go/discoveryengine/apiv1beta"
	"cloud.google.com/go/discoveryengine/apiv1beta/discoveryenginepb"
)

// Use the Rank method.
func rank(ctx context.Context, w io.Writer, projectID string, locationID string, query string) error {
	rankingConfig := fmt.Sprintf("projects/%s/locations/%s/rankingConfigs/default_ranking_config", projectID, locationID)
	records := []*discoveryenginepb.RankingRecord{
		{
			Id:      "record-1",
			Title:   "Google Cloud Overview",
			Content: "Google Cloud provides scalable computing, storage, and machine learning services.",
		},
		{
			Id:      "record-2",
			Title:   "Vertex AI Documentation",
			Content: "Vertex AI offers tools to build, train, and deploy generative AI models.",
		},
	}

	client, err := discoveryengine.NewRankClient(ctx)
	if err != nil {
		return fmt.Errorf("NewRankClient failed: %w", err)
	}
	defer client.Close()

	req := &discoveryenginepb.RankRequest{
		RankingConfig: rankingConfig,
		Query:         query,
		Records:       records,
	}

	resp, err := client.Rank(ctx, req)
	if err != nil {
		return fmt.Errorf("Rank failed: %w", err)
	}

	for _, record := range resp.GetRecords() {
		fmt.Fprintf(w, "Record ID: %s, Score: %f\n", record.GetId(), record.GetScore())
	}

	return nil
}

// [END discoveryengine_v1alpha_rankservice_rank]
