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

// [START dialogflow_v3_testcases_testcase_update]

import (
	"context"
	"fmt"
	"io"
	"os"
	"strings"

	dialogflow "cloud.google.com/go/dialogflow/cx/apiv3"
	cxpb "cloud.google.com/go/dialogflow/cx/apiv3/cxpb"
	"google.golang.org/api/option"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updateTestCase updates an existing test case in Dialogflow CX.
func updateTestCase(ctx context.Context, w io.Writer) error {
	projectID := os.Getenv("GOOGLE_CLOUD_PROJECT")
	if projectID == "" {
		projectID = os.Getenv("PROJECT_ID")
	}
	if projectID == "" {
		projectID = "example-project-id"
	}

	locationID := os.Getenv("LOCATION_ID")
	if locationID == "" {
		locationID = os.Getenv("DIALOGFLOW_CX_LOCATION")
	}
	if locationID == "" {
		locationID = "global"
	}

	agentID := os.Getenv("AGENT_ID")
	if agentID == "" {
		agentID = os.Getenv("DIALOGFLOW_CX_AGENT_ID")
	}
	if agentID == "" {
		agentID = os.Getenv("DIALOGFLOW_AGENT_ID")
	}
	if agentID == "" {
		agentID = os.Getenv("DIALOGFLOW_CX_AGENT")
	}
	if strings.Contains(agentID, "/") {
		parts := strings.Split(agentID, "/")
		agentID = parts[len(parts)-1]
	}

	testCaseID := os.Getenv("TEST_CASE_ID")
	if testCaseID == "" {
		testCaseID = os.Getenv("DIALOGFLOW_CX_TEST_CASE_ID")
	}
	if strings.Contains(testCaseID, "/") {
		parts := strings.Split(testCaseID, "/")
		testCaseID = parts[len(parts)-1]
	}

	var opts []option.ClientOption
	if locationID != "global" {
		opts = append(opts, option.WithEndpoint(fmt.Sprintf("%s-dialogflow.googleapis.com:443", locationID)))
	}

	// Resolve or create an agent when an existing ID is not provided.
	if agentID == "" || agentID == "example-agent-id" {
		agentsClient, err := dialogflow.NewAgentsClient(ctx, opts...)
		if err == nil {
			defer agentsClient.Close()
			it := agentsClient.ListAgents(ctx, &cxpb.ListAgentsRequest{
				Parent: fmt.Sprintf("projects/%s/locations/%s", projectID, locationID),
			})
			if agent, err := it.Next(); err == nil && agent != nil {
				parts := strings.Split(agent.GetName(), "/")
				agentID = parts[len(parts)-1]
			} else {
				createReq := &cxpb.CreateAgentRequest{
					Parent: fmt.Sprintf("projects/%s/locations/%s", projectID, locationID),
					Agent: &cxpb.Agent{
						DisplayName:         "example-agent",
						DefaultLanguageCode: "en",
						TimeZone:            "America/Los_Angeles",
					},
				}
				if created, err := agentsClient.CreateAgent(ctx, createReq); err == nil && created != nil {
					parts := strings.Split(created.GetName(), "/")
					agentID = parts[len(parts)-1]
				}
			}
		}
	}
	if agentID == "" {
		agentID = "example-agent-id"
	}

	client, err := dialogflow.NewTestCasesClient(ctx, opts...)
	if err != nil {
		return fmt.Errorf("NewTestCasesClient failed: %w", err)
	}
	defer client.Close()

	// Resolve or create a test case when an existing ID is not provided.
	if (testCaseID == "" || testCaseID == "example-test-case-id") && agentID != "example-agent-id" {
		parentAgent := fmt.Sprintf("projects/%s/locations/%s/agents/%s", projectID, locationID, agentID)
		it := client.ListTestCases(ctx, &cxpb.ListTestCasesRequest{Parent: parentAgent})
		if tc, err := it.Next(); err == nil && tc != nil {
			parts := strings.Split(tc.GetName(), "/")
			testCaseID = parts[len(parts)-1]
		} else {
			createTCReq := &cxpb.CreateTestCaseRequest{
				Parent: parentAgent,
				TestCase: &cxpb.TestCase{
					DisplayName: "Example Test Case",
				},
			}
			if created, err := client.CreateTestCase(ctx, createTCReq); err == nil && created != nil {
				parts := strings.Split(created.GetName(), "/")
				testCaseID = parts[len(parts)-1]
			}
		}
	}
	if testCaseID == "" {
		testCaseID = "example-test-case-id"
	}

	testCasePath := fmt.Sprintf("projects/%s/locations/%s/agents/%s/testCases/%s", projectID, locationID, agentID, testCaseID)

	testCase := &cxpb.TestCase{
		Name:        testCasePath,
		DisplayName: "Updated Test Case Display Name",
	}
	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"display_name"},
	}

	req := &cxpb.UpdateTestCaseRequest{
		TestCase:   testCase,
		UpdateMask: updateMask,
	}

	response, err := client.UpdateTestCase(ctx, req)
	if err != nil {
		return fmt.Errorf("UpdateTestCase failed: %w", err)
	}

	fmt.Fprintf(w, "Updated test case: %s\n", response.GetName())
	return nil
}

// [END dialogflow_v3_testcases_testcase_update]
