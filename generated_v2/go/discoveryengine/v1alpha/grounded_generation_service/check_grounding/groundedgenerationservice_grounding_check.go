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

// [START discoveryengine_v1alpha_groundedgenerationservice_check_grounding]

import (
	"context"
	"fmt"
	"io"

	discoveryengine "cloud.google.com/go/discoveryengine/apiv1beta"
	discoveryenginepb "cloud.google.com/go/discoveryengine/apiv1beta/discoveryenginepb"
)

// checkGrounding checks whether candidate text is grounded in reference facts.
func checkGrounding(ctx context.Context, w io.Writer, projectID string) error {
	groundingConfig := "default_grounding_config"

	client, err := discoveryengine.NewGroundedGenerationClient(ctx)
	if err != nil {
		return fmt.Errorf("NewGroundedGenerationClient failed: %w", err)
	}
	defer client.Close()

	req := &discoveryenginepb.CheckGroundingRequest{
		GroundingConfig: fmt.Sprintf("projects/%s/locations/global/groundingConfigs/%s", projectID, groundingConfig),
		AnswerCandidate: "Google Cloud provides scalable computing services.",
		Facts: []*discoveryenginepb.GroundingFact{
			{
				FactText: "Google Cloud provides infrastructure, platform capabilities, and industry solutions.",
			},
		},
	}

	resp, err := client.CheckGrounding(ctx, req)
	if err != nil {
		return fmt.Errorf("CheckGrounding failed: %w", err)
	}

	fmt.Fprintf(w, "Grounding support score: %f\n", resp.GetSupportScore())

	return nil
}

// [END discoveryengine_v1alpha_groundedgenerationservice_check_grounding]
